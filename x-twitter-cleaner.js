/**
 * X.com (Twitter) Posts & Replies Auto-Cleaner
 * 
 * Works seamlessly on:
 * - Posts Tab:   https://x.com/YOUR_USERNAME
 * - Replies Tab: https://x.com/YOUR_USERNAME/with_replies
 * 
 * Author: Janardan Singh (@jediubuntu)
 * License: Apache License 2.0 (Free to use with author attribution)
 * 
 * Features:
 * - Dual Mode: Automatically detects whether you are on the Posts or Replies tab
 *   and prints "Deleted post #X" or "Deleted reply #X" accordingly.
 * - Accurate Author Identification: Inspects [data-testid="User-Name"] so your own
 *   posts, quote tweets, and replies are targeted while skipping others' parent tweets.
 * - Smooth Non-Destructive Scrolling: Patiently scrolls down to let X's virtual feed load.
 * - No Abrupt Reloads: Never triggers a page reload that wipes your console session.
 * - Anti-Flag Protection: Human jitter delays (2.5s - 4.2s) + 12s breather every 15 deletions.
 * - Safe manual stop via: window.STOP_CLEANER = true;
 */

(async function deleteXContent() {
    const myHandle = window.location.pathname.split('/')[1]?.toLowerCase().replace('@', '');
    const isRepliesTab = window.location.pathname.toLowerCase().includes('/with_replies');
    const contentType = isRepliesTab ? 'reply' : 'post';

    console.log(`🛡️ [X.com Cleaner] Starting safe ${contentType}s deletion...`);
    console.log(`👤 [X.com Cleaner] Target handle: @${myHandle} (Active Mode: ${contentType.toUpperCase()}S)`);
    window.STOP_CLEANER = false;

    const sleep = (min, max) => {
        if (!max) return new Promise(resolve => setTimeout(resolve, min));
        const ms = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    /**
     * Reliably dismisses any open dropdown menu on X
     */
    async function dismissOpenMenu() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        const mask = document.querySelector('[data-testid="mask"]');
        if (mask && mask.offsetParent !== null) {
            mask.click();
        }
        document.body.click();
        await sleep(300, 500);
    }

    let totalDeleted = 0;
    let emptyScans = 0;
    const MAX_EMPTY_SCANS = 8; // Patient scroll attempts before concluding

    /**
     * Smoothly advances X's virtual feed
     */
    async function advanceFeed() {
        await dismissOpenMenu();

        // Check for X's "Show more", "Show replies", or "Retry" buttons
        const expandButtons = Array.from(document.querySelectorAll('button, div[role="button"]'))
            .filter(b => {
                const text = (b.innerText || '').toLowerCase();
                return text.includes("show more") || 
                       text.includes("show additional") || 
                       text.includes("show replies") || 
                       text.includes("retry") ||
                       text.includes("mostrar");
            });

        for (const btn of expandButtons) {
            if (btn.offsetParent !== null) {
                console.log("🔘 [X.com Cleaner] Clicking expand/retry button...");
                btn.click();
                await sleep(1000, 1500);
            }
        }

        // Multi-step smooth scroll sequence down
        for (let step = 0; step < 3; step++) {
            window.scrollBy({ top: 750, behavior: 'smooth' });
            window.dispatchEvent(new Event('scroll'));
            await sleep(400, 600);
        }

        await sleep(2000, 3000);
    }

    while (true) {
        if (window.STOP_CLEANER) {
            console.log("🛑 [X.com Cleaner] Stopped by user command.");
            break;
        }

        // Query all tweet articles on screen
        const articles = Array.from(document.querySelectorAll('article[data-testid="tweet"]'));
        let targetCaret = null;

        for (const article of articles) {
            const caret = article.querySelector('[data-testid="caret"]');
            if (!caret || caret.getAttribute('data-processed') === 'true') continue;

            // Author check via tweet header
            if (myHandle) {
                const authorHeader = article.querySelector('[data-testid="User-Name"]');
                const authorText = (authorHeader?.innerText || '').toLowerCase();
                
                // If author header does not contain your handle, it's someone else's post!
                if (authorHeader && !authorText.includes(`@${myHandle}`)) {
                    caret.setAttribute('data-processed', 'true');
                    continue;
                }
            }

            targetCaret = caret;
            break;
        }

        // Fallback: check any visible caret
        if (!targetCaret) {
            const allCarets = Array.from(document.querySelectorAll('[data-testid="caret"]'))
                .filter(c => c.getAttribute('data-processed') !== 'true' && c.offsetParent !== null);
            if (allCarets.length > 0) {
                targetCaret = allCarets[0];
            }
        }

        if (!targetCaret) {
            emptyScans++;
            console.log(`⏳ [X.com Cleaner] Scrolling to fetch more ${contentType}s... (${emptyScans}/${MAX_EMPTY_SCANS})`);
            await advanceFeed();

            if (emptyScans >= MAX_EMPTY_SCANS) {
                console.log(`🎉 [X.com Cleaner] All done! No more ${contentType}s found.`);
                console.log(`📊 Total ${contentType}s deleted this session: ${totalDeleted}`);
                break;
            }
            continue;
        }

        // Reset empty scan counter
        emptyScans = 0;

        try {
            targetCaret.setAttribute('data-processed', 'true');
            targetCaret.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await sleep(400, 700);

            // 1. Open the 3-dots menu
            targetCaret.click();
            await sleep(800, 1200);

            // 2. Locate "Delete" in menu items
            const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
            const deleteOption = menuItems.find(item => {
                const text = (item.innerText || '').toLowerCase();
                return text.includes("delete") || 
                       text.includes("eliminar") || 
                       text.includes("supprimer") || 
                       text.includes("löschen") || 
                       text.includes("excluir");
            });

            if (deleteOption) {
                deleteOption.click();
                await sleep(700, 1100);

                // 3. Confirm deletion in X's confirmation sheet
                const confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
                if (confirmBtn) {
                    confirmBtn.click();
                    totalDeleted++;
                    console.log(`🗑️ [X.com Cleaner] Deleted ${contentType} #${totalDeleted}`);

                    // Randomized human cooldown (2.5s - 4.2s)
                    await sleep(2500, 4200);

                    // Safety breather every 15 deletions
                    if (totalDeleted % 15 === 0) {
                        console.log("☕ [X.com Cleaner] Taking a 12s safety breather to keep account safe...");
                        await sleep(10000, 14000);
                    }
                } else {
                    await dismissOpenMenu();
                }
            } else {
                // Not a deletable tweet (repost or third party), close menu cleanly
                await dismissOpenMenu();
                await sleep(300, 500);
            }
        } catch (err) {
            console.warn("⚠️ [X.com Cleaner] Error processing item:", err);
            await dismissOpenMenu();
            await sleep(1000, 2000);
        }
    }
})();
