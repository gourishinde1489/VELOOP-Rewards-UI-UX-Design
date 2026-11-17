# VELOOP Rewards — Web Application

A responsive, high-fidelity Web3 reward experience and 10-Level 3D Achievement Badge System, faithfully recreated from the [VELOOP Reward Project Figma Design](https://www.figma.com/design/ozZmTU5iiidzOcHj8lcF95/VELoop-Reward-Project?node-id=0-1).

---

## 🌟 Overview

VELOOP Rewards is an interactive web app that gamifies user engagement through passive mining sessions, milestone-based achievements, and instant quest completion.

### Key Screens & Features

1. **VELOOP Mining Hero (Page 01)**:
   - **Visual Fidelity**: Faithful recreation of Desktop Variant 06 (1440×450), Tablet (834×540), and Mobile (402×874).
   - **Glassmorphic Control Card**: Translucent dark card with gold borders, glowing gradients, and brand typography.
   - **Earned Balance Counter**: Displays `+38 VEs` with a 3D gold coin; clicking triggers a coin-pickup chime and particle shower.
   - **Real-Time Mining Progress**: Dynamic golden progress bar with countdown timer (`45:20 Remaining...`).
   - **Interactive Mining Button**: "Start Mining" toggles active mining with an animated pulsing gold glow and passive VE generation.
   - **Holographic Quest Filmstrip**: Interactive boosters ("Watch Ads", "Play Games", "Complete Tasks", "And More") that grant instant VE rewards.

2. **10-Level 3D Achievement Badge System (Page 02)**:
   - **Overview Milestone Card**: Displays current achievement status (`1/10 Badges Unlocked`, `Bronze Tier`, `50 VEs Total`).
   - **Milestone Progress Tracks**: Dual visual bars tracking progress toward Silver tier (VEs earned: `50 / 250` and streak: `1 / 3 days`).
   - **Filter Controls**: Filter between `All 10 Badges`, `Unlocked Only`, and `Locked Only`.
   - **10 Distinct 3D Badges**:
     - **Level 01: Bronze** (FIRST STEP) — *Unlocked*
     - **Level 02: Silver** (RISING STAR) — *Locked / Unlockable*
     - **Level 03: Gold** (REWARD HUNTER) — *Locked / Unlockable*
     - **Level 04: Platinum** (ELITE EARNER) — *Locked / Unlockable*
     - **Level 05: Diamond** (HIGH ACHIEVER) — *Locked / Unlockable*
     - **Level 06: Emerald** (REWARD MASTER) — *Locked / Unlockable*
     - **Level 07: Sapphire** (TOP PERFORMER) — *Locked / Unlockable*
     - **Level 08: Ruby** (ELITE) — *Locked / Unlockable*
     - **Level 09: Master** (MASTER ACHIEVER) — *Locked / Unlockable*
     - **Level 10: Legend** (VELOOP LEGEND) — *Locked / Unlockable*
   - **Interactive Badge Detail Modal**: Click any badge to inspect its 3D artwork, ranking, description, and unlock criteria.
   - **Live Lock/Unlock Simulator**: Toggle any badge to test milestone progression with victory fanfares and particle effects.

3. **Audio & Visual FX**:
   - **Web Audio API**: Built-in sound synthesis with zero external audio dependencies (coin chimes, mining hum, fanfare).
   - **Canvas Particles**: Physics-based gold sparkle and coin shower on claim and unlock actions.

---

## 🚀 Running the App Locally

The application has zero build dependencies and runs out of the box using any static file server or browser.

### Option 1: Python 3 (Included Server)

```bash
python3 server.py
# Or on custom port:
python3 server.py 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Python HTTP Server

```bash
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 3: Deno

```bash
deno run --allow-net --allow-read jsr:@std/http/file-server -p 8080
```

### Option 4: Direct Browser Opening

Simply double-click `index.html` or open it directly in Chrome, Firefox, Safari, or Edge.

---

## 🌐 Deploying to Production

Because the app is clean, lightweight, and static, it can be deployed to any hosting platform in seconds.

### 1. Vercel

```bash
# With Vercel CLI
npx vercel deploy --prod
```
Or connect your Git repository to [Vercel](https://vercel.com) and deploy with standard static defaults (Root Directory: `./`).

### 2. Netlify

```bash
# With Netlify CLI
npx netlify deploy --prod --dir=.
```
Or drag and drop this project directory into the [Netlify Drop](https://app.netlify.com/drop) dashboard.

### 3. GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial VELOOP Rewards Web App"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to **Settings > Pages** in your GitHub repository.
3. Select `Branch: main`, folder `/ (root)`, and click **Save**.
4. Your site will be published at `https://<username>.github.io/<repo>/`.

### 4. Cloudflare Pages

1. Log in to the Cloudflare dashboard and go to **Pages**.
2. Select **Connect to Git** or direct upload.
3. Set the build output directory to `./` (no build command needed).

### 5. Docker (Nginx)

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
Build and run:
```bash
docker build -t veloop-rewards .
docker run -p 8080:80 veloop-rewards
```

---

## 📁 File Structure

```
.
├── index.html            # Main semantic markup with navigation, hero & badge sections
├── styles.css            # Responsive CSS matching Desktop, Tablet & Mobile Figma specs
├── app.js                # State management, Web Audio, canvas FX, timer & badge logic
├── server.py             # Zero-dependency local development server
├── deno.json             # Deno task configuration
├── README.md             # Project documentation & deployment guide
└── assets/               # 24 High-resolution design assets from Figma
    ├── hero-desktop.png  # Desktop hero 3D artwork (900x450)
    ├── hero-tablet.png   # Tablet hero 3D artwork
    ├── hero-mobile.png   # Mobile hero 3D artwork
    ├── coin-3d.png       # 3D VE Gold coin
    ├── btn-gold.png      # Metallic gold pill button background
    ├── ellipse-glow.svg  # Cyan/gold ambient glow SVG
    ├── badge-01-bronze.png ... badge-10-legend.png (10 Unlocked Badges)
    └── badge-02-silver-locked.png ... badge-10-legend-locked.png (9 Locked Badges)
```
