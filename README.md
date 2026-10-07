# 🐦 X.com (Twitter) Posts & Replies Auto-Cleaner

> **100% Free & Open-Source. Safe, zero-install browser automation to mass-delete your past Posts, Quote Tweets, and Replies on X (Twitter) with anti-ban delays, rate-limit protection, and auto-reload handling.**

---

## 📌 Why This Tool?
- **Dual Mode (Posts & Replies)**: Works seamlessly on both your main **Posts** tab (`x.com/username`) and your **Replies** tab (`x.com/username/with_replies`). The script automatically detects the active tab and logs `Deleted post #X` or `Deleted reply #X`.
- **100% Free Forever**: Unlike third-party SaaS tools that charge $10–$30/month or lock bulk deletion behind paywalls, this script runs completely in your own browser for free.
- **No Third-Party Access**: You do not have to grant OAuth permissions, API keys, or password access to any external service.
- **Solves the "X 20-Tweet Freeze"**: X (Twitter) intentionally freezes infinite scrolling after deleting ~20 tweets in a single session. This tool handles timeline resets and offers an automated reload loop.

---

## 🛡️ Anti-Ban & Rate-Limit Protection

X has strict automated spam filters. To keep your account safe, this tool is built with:
* **Smart Author Filtering**: Targets only your own posts, quote tweets, and replies while safely skipping third-party parent tweets in threads.
* **Human-like Jitter**: Adds randomized delays (2.5s – 4.2s) between each deletion to eliminate robotic patterns.
* **Safety Breathers**: Automatically takes a 12-second resting pause every 15 deletions to stay below X's rate limits.
* **Reliable Menu Dismissal**: Uses `Escape` key events to close popups without breaking page layout.

---

## 🚀 How to Use (Step-by-Step)

### Step 1: Open Target Tab in a Separate Browser Window
1. Open a **new browser window** and navigate to your target tab:
   - **To delete Posts & Quote Tweets**: `https://x.com/YOUR_USERNAME`
   - **To delete Replies**: `https://x.com/YOUR_USERNAME/with_replies`

### Step 2: Open Developer Console
1. Press **`F12`** (or **`Ctrl + Shift + J`** on Windows / **`Cmd + Option + J`** on Mac).
   - Alternatively, right-click anywhere on the page $\rightarrow$ click **Inspect** $\rightarrow$ select the **Console** tab.
2. *(If your browser shows a safety warning about pasting, type `allow pasting` and press Enter).*

### Step 3: Copy & Run the Script
1. Open the [**Raw Script Link (Click Here)**](https://raw.githubusercontent.com/jediubuntu/x-twitter-cleaner/main/x-twitter-cleaner.js).
2. Select everything (**`Ctrl + A`** or **`Cmd + A`**) and copy it (**`Ctrl + C`** or **`Cmd + C`**).
3. Switch back to your X window, paste it into the **Console**, and press **Enter**.
4. The script will automatically detect your mode (`posts` or `replies`), delete tweets sequentially with human-like delays, and report live progress!

---

## 🖥️ Pro-Tip: Use a Separate Browser Window

Modern browsers (Chrome, Edge, Brave, Firefox) aggressively **throttle background tabs** to save battery and RAM.

> [!TIP]
> **How to run while doing other work:**
> 1. Pull the X.com tab out into its **own separate browser window**.
> 2. Keep that window open (you can resize it and place it side-by-side or on a second monitor).
> 3. As long as the window is visible and not minimized, the cleaner will run steadily without being throttled.

---

## ⚠️ Rate Limits: Do Not Abuse!

* **Do not reduce the sleep timers**: The delays (2.5s – 4.2s) are calibrated to mimic human clicking speed.
* **If you hit a rate limit**: If X displays a *"Rate limit exceeded"* notification, stop the script, wait 15–30 minutes for your quota to reset, and rerun.

---

## ⏸️ How to Pause or Stop
- **In Console:** Type `window.STOP_CLEANER = true;` and press Enter.
- **Immediate Stop:** Simply refresh the page (**`F5`**).

---

## 📄 License & Attribution
Licensed under the **Apache License 2.0**.
Free for personal and commercial use. If you use, fork, or adapt this code in your own project or product, you must retain the copyright notice and provide attribution credit to the author: **Janardan Singh ([@jediubuntu](https://github.com/jediubuntu))**.
