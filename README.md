# Draw to Life – Final Project Documentation (Week 46 website)

This is the updated Week 46 website for the final Creative Programming project **Draw to Life**, created by **Bayan Alasadi and Hanan Mughrabi** at Södertörn University.

## About Draw to Life

Draw to Life is an interactive art installation. A participant draws with p5.js on a laptop and presses **Generate with AI**. The main application sends the sketch and a text prompt to a local Node.js server, which communicates with the OpenAI image API. The generated abstract artwork is shown on a separate projector page using BroadcastChannel.

The **actual drawing application** is a separate project and is **not included in this documentation site**. This website is for the assignment's documentation and includes a PixiJS art experiment from Week 46.

## Final documentation included

The page includes five actual photographs showing the drawing process, AI outputs and the projected installation. The original **draw-to-life.mp4** recording (58.2 seconds) is present in `media/` and has NOT been recompressed, trimmed or changed.

Photo order: blue sketch → AI result → second sketch → second AI result → other generated artwork.

**IMPORTANT: GitHub publishing limit.** The original video is 132,982,145 bytes (about 133 MB), above GitHub's 100 MB per-file hard limit. The COMPLETE ZIP is for keeping and previewing locally; do not try to commit this video to the GitHub website repository as-is. To publish the website with the exact original video, host the original MP4 separately on a service that permits this size and direct video playback, and change the `<source src="media/draw-to-life.mp4">` URL in `index.html` to its publicly reachable direct MP4 link. Do not expose API keys. A separate **GitHub-ready** ZIP omits only the MP4 and is provided alongside the complete ZIP.

## Site files

- `index.html`: project overview, gallery/video section, and Week 46 content
- `style.css`: layout, colors and documentation gallery styling
- `script.js`: the original interactive PixiJS experiment
- `draw-to-life-current-screen.png`: current drawing application screenshot
- `media/`: five documented photos plus the original MP4 recording

## Run

Open this folder in Visual Studio Code and use **Live Server** to preview this **documentation website**. Internet access is needed to load PixiJS from its CDN.

The separate **main AI drawing application** requires Node.js, a server and a private API key. Do not publish `.env`, private API keys or other secrets.

## Tech used

Documentation site: HTML, CSS, JavaScript, PixiJS 8 (CDN), optionally GitHub Pages for publishing.

Main drawing installation: p5.js, Node.js, OpenAI image API and BroadcastChannel.

## Use of generative AI

AI tools, including ChatGPT, were used to assist with website structure, styling, JavaScript and documentation text. The project creators chose the direction, worked on the design, tested changes and evaluated the results. Confirm the exact tool/version and your own contributions in the mandatory AI declaration before submission.
