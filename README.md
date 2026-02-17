# ♻️ ScrappyDoo — Digitizing the Scrap Economy of Pakistan

> A frontend-only web application that bridges the gap between scrap sellers, small dealers, and large-scale bulk traders — bringing transparency, fair pricing, and efficiency to Pakistan's informal scrap economy.
# Team - Cheater
> My name is Shahryar Khalid.I am from PUCIT, studying data science, second semester. I am passionate about learning new things.
# Domain - Ecommerce and Management
> A 24 Hour Hackathon Projct, manages and deal with the real world problem, solve unorganized scrap dealing system in Pakistan. This covers B2B and B2C bussiness.
---

## 🚀 Live Demo

Open `index.html` in any browser — no server, no setup required.

---

## 💡 Problem Statement

Pakistan's scrap economy is largely unorganized. Households don't know the fair market price for their waste. Small scrap dealers lack visibility into bulk buyers. Large trading companies have no efficient way to source consolidated lots. ScrappyDoo digitizes this entire supply chain in one simple web app.

---

## ✨ Features

### 🏠 Home Page
- Live indicative market rates for 6 scrap categories (Plastic, Paper, Metal, Aluminum, Copper, E-Waste) in PKR/kg
- Step-by-step explainer of how the platform works

### 📦 Seller Dashboard (`I Have Scrap`)
- Post a new scrap listing with category, weight, location, and optional photo upload
- View your active listings and their status (Pending / Bidded)
- Review competing bids from dealers — including price per kg, pickup date, and dealer rating
- Accept a deal with one click

### 🏭 Dealer Dashboard (`I Am a Dealer`)
- **B2C Channel:** Browse open scrap listings from individual sellers, submit price bids with a proposed pickup date
- **B2B Channel:** View available inventory lots from small dealers across Lahore, select multiple lots, and analyze profitability via a real-time **Profit Optimizer** (shows total cost, estimated revenue at bulk sell rate, and projected gross profit)
- Connect with 10+ large bulk traders in Lahore (Bandha Road, Ravi Road, Saggian, etc.) — eligibility gating based on minimum order weight

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Plus Jakarta Sans |

> **100% frontend.** No Node.js, no npm, no build step, no API keys.

---

## 📁 Project Structure

```
scrappydoo/
├── index.html      # App entry point
├── styles.css      # All styles, animations, responsive layout
└── app.js          # All app logic, state management, and rendering
```

---

## ▶️ Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/scrappydoo.git

# Navigate into the folder
cd scrappydoo

# Open in browser (no server needed)
open index.html
```

Or simply double-click `index.html` — it works out of the box.

---

## 🗺️ App Architecture

ScrappyDoo uses a simple **single-page application (SPA)** pattern built entirely in vanilla JS:

- **State** is managed in a single `appState` object
- **Routing** is hash-based (`#home`, `#seller`, `#dealer`)
- **Rendering** is done by a central `render()` function that re-paints the DOM on every state change
- **No frameworks** — just clean, readable JavaScript

---

## 🎯 Scrap Categories & Demo Rates

| Category | Price Range (PKR/kg) |
|---|---|
| ♻️ Plastic | 84 – 168 |
| 📄 Paper | 42 – 98 |
| 🔩 Metal | 70 – 140 |
| ⚙️ Aluminum | 336 – 560 |
| 🔌 Copper | 1820 – 2380 |
| 💻 E-Waste | 140 – 336 |

---

## 🏙️ Target Market

Currently scoped to **Lahore, Pakistan** with demo data from real localities (DHA, Gulberg, Bahria Town, Johar Town, etc.) and real bulk dealer hubs (Bandha Road, Waaris Khan, Saggian, Ravi Road).

---

## 🔮 Future Roadmap

- [ ] User authentication (seller vs. dealer accounts)
- [ ] Real-time bid notifications via WebSockets
- [ ] GPS-based dealer matching
- [ ] SMS/WhatsApp integration for dealers without smartphones
- [ ] Backend API + database for persistent listings
- [ ] Expand beyond Lahore to Karachi, Islamabad, Faisalabad

---

## 👨‍💻 Built For

> This project was built as a hackathon submission. The goal was to demonstrate a viable, working MVP of a digital marketplace for Pakistan's informal recycling sector — using the simplest possible tech stack so the idea can be evaluated without infrastructure complexity.

---

## 📄 License

MIT — free to use, fork, and build upon.
