# VELOOP Rewards — 10-Level 3D Achievement Badges

A production-ready, fully responsive implementation of the [VELOOP Reward Project Figma Design](https://www.figma.com/design/ozZmTU5iiidzOcHj8lcF95/VELoop-Reward-Project?node-id=0-1) (Page 02 — `02 Achievement Badges` / Node `192:37`), featuring a comprehensive Web3 gamified milestone and 3D collectible badge design system.

---

## 📌 Project Overview

**VELOOP Rewards** is an engaging rewards and milestone tracking platform designed to motivate user progression through active mining sessions, interactive quests, and a 10-level achievement badge hierarchy.

The design strictly follows a premium dark navy (`#161827`) and metallic gold palette, complete with:
- **Milestone Overview Banner**: Dual progress tracks for VEs earned and active streak days, automatic next-badge target calculation, and real-time stats.
- **10-Level 3D Achievement Badges**: High-fidelity 3D collectible badges from Level 01 Bronze to Level 10 Legend, supporting unlocked and locked states.
- **Natural Responsiveness**: Fully fluid design adapting cleanly across Large Desktop (1512px+), Standard Laptop (1024px–1280px), Tablet (640px–960px), and Mobile (< 640px) without any component overlap or artificial device frames.
- **Interactive Audio & Visual Effects**: Web Audio API synthesized fanfares, coin collection chimes, and real-time canvas particle bursts.
- **Instant VE Quests**: Interactive tasks (*Watch Sponsor Clip*, *Miner Coin Rush*, *Daily Check-in*, *Referral Bonus*) that immediately reward VEs and trigger milestone unlocks.

---

## 🏆 10-Level 3D Badge System

| Level | Badge Name | Rank | Unlock Requirement | Visual Asset |
|---|---|---|---|---|
| **Level 01** | **Bronze** | `FIRST STEP` | Activate account & start initial session | `assets/badge-01-bronze.png` |
| **Level 02** | **Silver** | `RISING STAR` | Earn 250 VEs & maintain 3-day active streak | `assets/badge-02-silver.png` |
| **Level 03** | **Gold** | `REWARD HUNTER` | Earn 750 VEs & maintain 7-day active streak | `assets/badge-03-gold.png` |
| **Level 04** | **Platinum** | `ELITE EARNER` | Earn 1,500 VEs & maintain 14-day streak | `assets/badge-04-platinum.png` |
| **Level 05** | **Diamond** | `HIGH ACHIEVER` | Earn 3,000 VEs & maintain 30-day streak | `assets/badge-05-diamond.png` |
| **Level 06** | **Emerald** | `REWARD MASTER` | Earn 6,000 VEs & complete 50 quests | `assets/badge-06-emerald.png` |
| **Level 07** | **Sapphire** | `TOP PERFORMER` | Earn 12,000 VEs & reach Top 5% miner rank | `assets/badge-07-sapphire.png` |
| **Level 08** | **Ruby** | `ELITE` | Earn 25,000 VEs & maintain 60-day streak | `assets/badge-08-ruby.png` |
| **Level 09** | **Master** | `MASTER ACHIEVER` | Earn 50,000 VEs & mentor 10 active miners | `assets/badge-09-master.png` |
| **Level 10** | **Legend** | `VELOOP LEGEND` | Earn 100,000 VEs & seasonal accolades | `assets/badge-10-legend.png` |

---

## 🛠️ Dual Implementations Included

This repository provides two complete, production-ready codebases:

### 1. Root Web App (Zero Build Dependencies)
- **Files**: `index.html`, `styles.css`, `app.js`, `server.py`
- Runs instantly in any standard browser or local static HTTP server.
- Uses native Web Audio API and HTML5 Canvas particle effects.

### 2. Next.js 14 App Router (`nextjs-app/`)
- **Files**: `nextjs-app/app/page.tsx`, `nextjs-app/app/globals.css`, `nextjs-app/lib/`
- Built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**.
- Fully optimized for deployment on [Vercel](https://vercel.com).

---

## 🚀 How to Run Locally

### Start Both Servers Concurrently
Run the included launcher script:
```bash
./start_all.sh
```
- **Server 1 (Vanilla Web App)**: `http://localhost:8080`
- **Server 2 (Next.js 14 App)**: `http://localhost:3000`

---

### Option A: Root Vanilla Web App Only
Run with Python:
```bash
python3 server.py 8080
```
Or open `index.html` directly in any web browser.

---

### Option B: Next.js 14 App Only
```bash
cd nextjs-app
npm install      # or: deno install
npm run dev      # or: deno task dev -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended for Next.js)
```bash
cd nextjs-app
npx vercel --prod
```
Or connect your GitHub repository directly in the [Vercel Dashboard](https://vercel.com).

### Deploy to GitHub Pages (For Root Static Web App)
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`) / `/ (root)`
3. Save. The site will be published at `https://<username>.github.io/<repo-name>/`.

### Deploy to Netlify
- Drag and drop the repository folder into [Netlify Drop](https://app.netlify.com/drop), or run:
  ```bash
  npx netlify deploy --prod --dir=.
  ```

---

## 📁 Repository Structure

```
.
├── index.html            # Primary Badges Landing Page (Semantic HTML5)
├── styles.css            # Responsive CSS design system (Figma Node 192:37)
├── app.js                # State manager, 3D badges renderer, Web Audio FX & particles
├── server.py             # Python HTTP server for local testing
├── start_all.sh          # Dual server runner script (:8080 and :3000)
├── assets/               # High-resolution local 3D badges and UI assets
├── nextjs-app/           # Full Next.js 14 + TypeScript + Tailwind project
│   ├── app/
│   │   ├── page.tsx      # Next.js Badges Landing Page Component
│   │   ├── layout.tsx    # Root layout & font loading
│   │   └── globals.css   # Global styles & Tailwind directives
│   ├── lib/              # Types, helper utilities & Web Audio synthesizer
│   ├── package.json      # Dependencies and scripts
│   └── tailwind.config.ts# Custom gold palette & typography tokens
└── README.md             # Project documentation & deployment guide
```

---

## 👩‍💻 Credits

- **Design**: [VELOOP Reward Project Figma Design](https://www.figma.com/design/ozZmTU5iiidzOcHj8lcF95/VELoop-Reward-Project?node-id=0-1)
- **Designer**: Gauri Santosh Shinde (UI/UX Design Intern)
- **Implementation**: VELOOP Rewards Engineering
