# Zingaari — Official Studio Website

> **Rooted in India. Made for Play.**  
> An independent game development studio founded in 2025 by Dr. Mayank Loonker.

---

## 🌟 Project Overview

This repository contains the complete, responsive, static website for **Zingaari Game Studio**, designed to introduce the studio, showcase its flagship title **Dhaba Dash**, highlight the founding team, and provide simple contact and playtest whitelisting links.

The website is built with lightweight, standards-compliant HTML5, modular CSS3, and vanilla JavaScript with **zero build dependencies**, enabling instant deployment to any static hosting provider.

---

## 📁 Repository Structure

```text
f:\Zingaari\
├── index.html                   # Home Page (Studio Intro, About, Dhaba Dash Card, Contact)
├── dhaba-dash.html              # Dhaba Dash Game Page (Screenshots, Features, Specs, Playtest)
├── team.html                    # Our Team Page (Founder & Team Cards, Pedigree, Careers)
├── favicon.png                  # Browser tab icon (32x32)
├── apple-touch-icon.png         # iOS home screen icon (180x180)
├── README.md                    # Project documentation & maintenance guide
└── assets/
    ├── css/
    │   └── style.css            # Complete studio stylesheet & responsive design system
    ├── js/
    │   └── main.js              # Navigation drawer, gallery filters, lightbox & copy helpers
    └── images/
        ├── zingaari-logo.png    # Official transparent studio logo
        ├── zingaari-spark.png   # Studio spark emblem
        ├── favicon.png          # App icon
        ├── team/
        │   ├── mayank-loonker.jpg   # Dr. Mayank Loonker (Founder)
        │   ├── prawigya-pariyar.png # Prawigya Pariyar (Game Designer & Developer)
        │   └── sonu-krishnan.jpg    # Sonu Krishnan (Visual Designer & Artist)
        ├── games/
        │   ├── dhaba-dash-logo.png      # Official Dhaba Dash title mark
        │   ├── dhaba-dash-poster.jpg    # Full promotional poster artwork
        │   ├── dhaba-dash-isometric.png # Architectural isometric restaurant schematic
        │   ├── gameplay-serving.jpg     # In-game charpai serving rush screenshot
        │   ├── gameplay-counter.jpg     # In-game kitchen counter & cashier screenshot
        │   ├── screen-aloo-paratha.jpg  # Aloo Cheese Paratha unlock card
        │   ├── screen-food-menu.jpg     # Food Menu unlock interface
        │   ├── screen-regional-map.jpg  # Map of India regional progression
        │   ├── screen-decor-upgrade.jpg # Charpai & seating upgrades
        │   └── screen-missions.jpg      # Daily missions & LiveOps quests
        └── illustrations/
            ├── paratha-platter.png  # Paratha thali illustration
            ├── pantry-store.png     # Dhaba spice & pantry store
            ├── table-red.png        # Red dhaba dining set
            ├── table-blue.png       # Blue dhaba dining set
            ├── buffet-counter.png   # Golden sweet & snacks buffet
            ├── mithai-counter.png   # Sweet shop counter
            └── wash-station.png     # Brick handwash station
```

---

## 🎨 Visual Identity & Brand System

- **Primary Brand Color:** `#DE4B23` (Zingaari Terracotta / Vermilion)
- **Secondary Brand Color:** `#F5A623` (Marigold / Amber Gold)
- **Accent Color:** `#1F8291` (Indian Heritage Teal)
- **Canvas / Background:** `#FAF5ED` (Warm Sand / Parchment)
- **Dark Sections & Tandoor:** `#1B120F`
- **Headings Font:** `Outfit` (Bold, friendly geometric modern display)
- **Body Font:** `Plus Jakarta Sans` (Clean, contemporary, highly readable sans-serif)

---

## 🚀 How to Run Locally

You can serve the static files with any local HTTP server:

### Using Python:
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Node.js:
```bash
npx serve .
```

---

## 🌐 Deployment Instructions

Since this is a lightweight static website, it can be deployed for free to any modern hosting platform in under 2 minutes:

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `github.com/zingaari/zingaari.github.io`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.
4. In **Custom domain**, enter your domain (e.g. `zingaari.com`).

### 2. Vercel
1. Run `npx vercel` or connect the GitHub repository in the Vercel dashboard.
2. The project will auto-detect as a static project. Click **Deploy**.

### 3. Netlify
1. Drag and drop the `Zingaari` folder directly into the Netlify Dashboard, or connect via Git.
2. Set publish directory to `.`.

---

## 🛠️ How to Maintain & Update Content

### 1. Adding a New Game
In `index.html`, duplicate the `<article class="game-card-flagship">` block in the `#games` section, or replace the `<div class="game-card-future">` slot. Add a dedicated page `game-name.html` following the structure of `dhaba-dash.html`.

### 2. Adding or Updating Team Members
In `team.html`, each team member is enclosed in a `<article class="team-card">`. Simply duplicate this card structure to add new team members. Place their portrait image in `assets/images/team/`.

### 3. Updating Dhaba Dash Screenshots
Place new screenshots in `assets/images/games/` and add them to the `<div class="gallery-grid">` in `dhaba-dash.html` with the desired `data-category` (`gameplay`, `menu`, or `progression`).

### 4. Updating Official Contact Details
The official email is `zingaari.india@gmail.com` and phone is `+91 9609042762`. Search and replace these strings in `index.html`, `dhaba-dash.html`, and `team.html`.
