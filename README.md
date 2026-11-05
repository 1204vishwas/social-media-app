# 🌌 AURA — Dual Reality Social Media Platform

An ultra-modern, responsive social network with all Instagram-equivalent capabilities, an original cyber-luminescent aesthetic (dark obsidian black, neon purple, cyan accents), and a groundbreaking flagship feature: **The Dual Prism Protocol**.

---

## 📁 Repository Structure

```
social media aap/
├── frontend/                     # All React, Vite, Tailwind & Client UI code
│   ├── public/                   # Static assets & brand mark logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/             # Sign In, Sign Up, Google Auth, Password Strength
│   │   │   ├── common/           # Reusable UI primitives (Button, Input, Checkbox, Toast)
│   │   │   ├── create/           # Dual Prism Creator Studio with live splitter preview
│   │   │   ├── explore/          # Masonry discover grid & search
│   │   │   ├── feed/             # Dual Prism posts & Synchronicity frequency dial
│   │   │   ├── layout/           # SocialShell, AuthLayout, AmbientGlow
│   │   │   ├── messages/         # Chrono Whispers (encrypted DMs & voice notes)
│   │   │   ├── navigation/       # TopBar & Floating Holographic Bottom Dock
│   │   │   ├── notifications/    # Slide-over real-time activity drawer
│   │   │   ├── profile/          # Spatial Realm with 4 tabbed collections
│   │   │   └── stories/          # Glowing animated story rings & story viewer
│   │   ├── config/               # Frontend environment configuration
│   │   ├── context/              # AuthContext & SocialContext
│   │   ├── hooks/                # Custom hooks (useAuth, useSocial, usePasswordStrength)
│   │   ├── services/             # Mock & API data services
│   │   ├── styles/               # Tailwind CSS, neon shadows & reality slider styling
│   │   ├── types/                # TypeScript interfaces for Auth & Social models
│   │   └── utils/                # Native Web Audio sound synthesizer & class merger
│   ├── index.html                # App entry HTML with typography
│   ├── package.json              # Frontend dependencies & scripts
│   ├── tailwind.config.js        # Custom purple & void color theme
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite bundler configuration
│
├── backend/                      # All Node.js, Express, REST API & server files
│   ├── src/
│   │   ├── config/               # Database connection (db.js/db.ts) & environment (env.js/env.ts)
│   │   ├── controllers/          # Business logic (auth, posts, stories, reels, chat, users)
│   │   ├── middleware/           # JWT protect middleware & global errorHandler
│   │   ├── models/               # Data schemas (User, Post, Story, Reel, Message)
│   │   ├── routes/               # Express REST routes mounted at /api/v1
│   │   ├── server.js             # Native Node.js REST server (zero dependency ready)
│   │   └── server.ts             # Express TypeScript server entry point
│   ├── package.json              # Backend dependencies & scripts
│   ├── tsconfig.json             # Backend TypeScript configuration
│   ├── .env                      # Backend local environment variables
│   ├── .env.example              # Backend environment template
│   └── README.md                 # Backend API documentation
│
├── package.json                  # Root runner script configuration
└── README.md                     # Root project documentation
```

---

## 🚀 Running the Project

### 1. Run Frontend (Port 3000)
```bash
cd frontend
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Run Backend (Port 5000)
```bash
cd backend
node src/server.js
```
Health Check: **[http://localhost:5000/api/health](http://localhost:5000/api/health)**

---

## 🌟 The Unique Feature: "The Dual Prism Protocol"

Every post in AURA is a **two-layer entangled reality**:
1. **The Canvas (Curated Reality)**: The polished aesthetic image or artwork.
2. **The Raw Echo (Unfiltered Frequency)**: The behind-the-scenes reality — unedited photo, room voice memo waveform, and the creator’s raw thought-log.

Viewers can **drag the reality splitter slider** over any post to seamlessly dissolve the canvas into the raw echo in real time!
