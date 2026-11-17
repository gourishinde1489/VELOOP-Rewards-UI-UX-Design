# VELOOP Rewards — Complete Multi-Screen Web Application

An exact, responsive recreation of the [VELOOP Reward Project Figma Design](https://www.figma.com/design/ozZmTU5iiidzOcHj8lcF95/VELoop-Reward-Project?node-id=0-1), featuring:
1. **Interactive Device Screen Switcher**: One-click switching between **Fluid Responsive**, **Desktop (1440×450)**, **Tablet (834×540)**, **Mobile (402×874)**, and **10-Level 3D Badges System**.
2. **Zero-Overlap Layouts**: Fixed all component clipping and overlapping by decoupling the control card, background artwork, floating coins, and filmstrip bar.
3. **Synchronized Reactive State**: Starting mining, claiming rewards, or completing quests updates live progress and timers across all device views in real time.
4. **Dual Implementation**:
   - **Root Web App** (`index.html`, `styles.css`, `app.js`): Zero build dependencies, runs immediately in any browser or with `python3 server.py`.
   - **Next.js 14 App** (`nextjs-app/`): Full TypeScript, React 18, and Tailwind CSS implementation ready for Vercel deployment.

---

## 📱 Supported Figma Screens & Devices

| Screen | Dimensions | Figma Frame | Description |
|---|---|---|---|
| **Desktop Hero** | `1440 × 450 px` | `Desktop — Hero variant 06` (59:4) | Left glassmorphic card (661px), 10 angled floating 3D coins, cybernetic background with chest (900px) |
| **Tablet Hero** | `834 × 540 px` | `Tablet — Responsive reward landing` (271:399) | Top-left brand header, top-right "Start Mining" button, ambient glow ellipse, bottom-left stats card |
| **Mobile Hero** | `402 × 874 px` | `Mobile — Responsive reward landing` (84:18) | Top brand card, center 3D artwork (468×455), bottom stats and mining action card |
| **Achievement Badges** | `1512 × 2820 px` | `02 Achievement Badges` (192:37) | Milestone overview, dual progress tracks (50/250 VEs, 1/3 days), filter toolbar, 10 3D badge cards |
| **Fluid Responsive** | Auto | Responsive Flexbox / Grid | Fluid auto-scaling layout that seamlessly adapts to any screen width from 320px to 4K |

---

## 🚀 How to Run Locally

### Option A: Root App (Instant, Zero Dependencies)

Run with the included Python server:
```bash
python3 server.py 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

You can also run with:
- **Deno**: `deno run --allow-net --allow-read jsr:@std/http/file-server -p 8080`
- **Python**: `python3 -m http.server 8080`
- **Direct Browser**: Open [`index.html`](file:///run/media/gauri/New%20Volume/UIUX%20project/index.html) directly in any browser.

---

### Option B: Next.js 14 App (`nextjs-app/`)

A modern Next.js 14 + React + TypeScript + Tailwind CSS application is available in the [`nextjs-app/`](file:///run/media/gauri/New%20Volume/UIUX%20project/nextjs-app/) directory.

```bash
cd nextjs-app
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

To build for production:
```bash
npm run build
npm run start
```

---

## 🎯 Testing the Responsive Designs & Interactions

1. **Switching Screens**:
   - Use the top navigation bar to switch between:
     - **🌐 Fluid Responsive**: Watch how elements fluidly stack without overlapping at any window width.
     - **💻 Desktop (1440px)**: Preview the exact 1440×450 desktop frame with all 10 floating coins in their Figma coordinate positions.
     - **📱 Tablet (834px)**: Preview the tablet frame with top-right button placement and background blur filters.
     - **📲 Mobile (402px)**: Preview the mobile phone viewport with the center miner artwork and bottom control box.
     - **🏆 Badges System**: Inspect all 10 3D badges with filter pills (*All*, *Unlocked*, *Locked*).

2. **Interactive Controls**:
   - **Start Mining**: Toggles live passive earning, countdown timer (`45:20 Remaining...`), and progress bar.
   - **Earned Card (+38 VEs)**: Click to trigger a coin pickup chime and particle shower.
   - **Quests Button**: Opens instant quest tasks (*Watch Ads*, *Miner Coin Rush*, *Daily Check-in*, *Refer a Friend*) to earn +VEs immediately.
   - **Badge Unlock Simulator**: Click any badge's **Toggle** button to simulate unlocking/locking badges, accompanied by victory fanfares and particle bursts.
   - **Sound Toggle**: Click 🔊 to mute/unmute synthesized Web Audio sound effects.

---

## 🌐 Deploying to Production

### Vercel
- **Root App**: `npx vercel deploy --prod` (select Root Directory `./`)
- **Next.js App**: `cd nextjs-app && npx vercel deploy --prod`

### Netlify
- Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop), or run `npx netlify deploy --prod --dir=.`

### GitHub Pages
- Push the repository to GitHub and enable **Pages** with source set to `Branch: master` and folder `/ (root)`.

---

## 📁 Project Structure

```
.
├── index.html            # Main semantic HTML with multi-screen switcher & responsive stages
├── styles.css            # Custom CSS with exact Figma coordinates and fluid responsive styling
├── app.js                # State management, Web Audio synthesis, particle canvas, and screen sync
├── server.py             # Lightweight local development server
├── README.md             # Documentation & deployment guide
├── assets/               # 25 High-resolution Figma design assets
└── nextjs-app/           # Next.js 14 App Router project
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx      # Next.js interactive multi-screen implementation
    │   └── globals.css
    ├── lib/
    │   ├── types.ts
    │   └── soundFX.ts
    └── public/assets/    # Bundled design assets for Next.js
```
