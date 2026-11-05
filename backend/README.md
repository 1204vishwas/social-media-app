# 🌌 AURA — Backend API Architecture

Industrial RESTful API service powering **AURA**, the Dual Reality Social Media Network.

---

## 📡 Base Endpoint
```
http://localhost:5000/api/v1
```

### Health Check
```http
GET /api/health
```

---

## 🛡️ REST API Route Specifications

### 1. Authentication (`/api/v1/auth`)
- `POST /register`: Create new user account
- `POST /login`: Sign in with email and password
- `POST /google`: Sign in / register via Google OAuth 2.0
- `GET /me`: Fetch authenticated user profile

### 2. Dual Prism Posts (`/api/v1/posts`)
- `GET /`: Retrieve feed posts (supports `?vibe=cosmic|voltage|violet|serenity|all`)
- `POST /`: Mint a new Dual Prism creation (Canvas layer + Raw Echo layer)
- `POST /:id/like`: Toggle like on post
- `POST /:id/save`: Bookmark / unbookmark post
- `POST /:id/echo-shift`: **The unique metric** — increment reality peel count
- `POST /:id/comments`: Post a comment with optional acoustic timestamp anchor

### 3. Stories (`/api/v1/stories`)
- `GET /`: Retrieve active 24h stories
- `POST /`: Create a new story with music tag and vibe wavelength

### 4. Pulse Reels (`/api/v1/reels`)
- `GET /`: Retrieve short-form vertical reels
- `POST /:id/like`: Like / unlike reel

### 5. Encrypted Whispers / DMs (`/api/v1/messages`)
- `GET /conversations`: Retrieve active chat conversations and unread counts
- `POST /send`: Send encrypted direct message or voice memo

### 6. User Profiles (`/api/v1/users`)
- `GET /:username`: Retrieve public creator realm, metrics & creations
- `PATCH /bio`: Update creator bio and social links

---

## 🚀 Running the Backend

```bash
# Install dependencies
npm install

# Run development server with auto-reload
npm run dev

# Build TypeScript for production
npm run build

# Start production server
npm start
```
