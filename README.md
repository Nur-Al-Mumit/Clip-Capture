# Clip Capture 🎬

Capture and download specific clips from YouTube videos directly in your browser.

## 📖 My Journey (Why I Built This)

I frequently found myself needing just a small, specific part of a YouTube video. Every single time, I had to download the entire large video and then manually cut the clip out. It was a hassle and a waste of time.

I built **Clip Capture** as a personal solution to solve this exact problem—no fancy extras, just a tool that serves its purpose. Realizing that many other people likely face this same frustration, I make it open-source and share it with everyone. 

I'm sharing it here on GitHub (instead of the Chrome Web Store) because I don't currently have a payment method to cover the developer registration fee, but I didn't want that to stop me from sharing this solution with you!

---

## 🤖 Built with AI

This project was built with the help of **AI**.

---

## ⚠️ Current Limitations (How it Works)

Since this is an early version developed for personal use, there are a few things to keep in mind:

1.  **Watch to Record:** The extension captures the live stream directly from your player. This means you have to keep the video segment playing for it to record.
2.  **Player Settings:** Because it records the live stream, whatever you see on your player—like the current **Video Speed**, **Resolution**, and any **Forward/Backward jumps**—will also be captured in your recorded clip. Make sure your video is set to your desired quality before starting!
3.  **Future Improvements:** There is a lot of room for optimization, such as background processing and format conversion, which may come in future updates.

---

## 🚀 How to Install

If you just want to use the extension without coding, follow these steps:

1.  **Download** the `dist/` folder from this repository.
2.  Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/`).
3.  **Enable "Developer mode"** in the top-right corner.
4.  Click **"Load unpacked"** and select the `dist/` folder you just downloaded.
5.  Open any YouTube video and start capturing!

---

## 🛠️ Development (For Developers)

The source code is located in the `source/` directory.

### Project Structure:
-   `source/`: Contains the React/Vite source code, configurations, and assets.
-   `dist/`: The pre-built, production-ready extension.

### How to build from source:
1.  Navigate into the source directory:
    ```bash
    cd source
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the extension:
    ```bash
    npm run build
    ```
    This will output the updated bundle directly to the `../dist` folder in the root directory.

---

## ✨ Features:
-   🎥 **Precise Clipping:** Capture specific video segments.
-   ⚡ **Instant Downloads:** Quick and local processing.
-   🎨 **Premium UI:** Fast, reactive, and beautiful design.
-   📁 **Open Source:** Totally free and transparent.

Enjoy capturing! 🎬🚀
