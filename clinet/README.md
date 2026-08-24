# WebDev Times — AI News Platform

A production-oriented AI-powered web development news platform that aggregates, categorizes, summarizes, and presents the latest news from the world of Web Development and Artificial Intelligence.

The project is being built with a feature-based React architecture, TanStack Query for server-state management and caching, Redux Toolkit for UI state, and a Node.js + Express backend. AI-powered news generation and summarization will be handled through Groq.

---

## 🚀 Project Status

> Currently under development

### Completed

- React + Vite setup
- Feature-based frontend structure
- WebDev Times landing page
- News page
- News cards and grid
- Category filtering
- TanStack Query setup
- 30-minute query stale time
- Redux Toolkit setup
- Sidebar state management
- Axios API client
- Node.js + Express backend
- /api/news endpoint
- Frontend → Backend API communication

### Planned

- Groq AI integration
- AI-generated news summaries
- Real news sources / RSS ingestion
- MongoDB integration
- Redis caching
- Persistent TanStack Query cache
- Load More / pagination
- Search
- Live news ticker
- News details page
- Bookmarks
- Authentication
- Rate limiting
- Request validation
- Centralized error handling
- Logging
- Testing
- Docker
- CI/CD
- Production deployment

---

# ✨ Features

## 📰 AI-Powered News

The platform will use AI to process technology news and provide users with concise, useful summaries.

News will be organized into categories such as:

- AI Models
- Frontend
- Backend
- Dev Tools
- Design
- Strategy

---

## 🔎 Search

Users will be able to search for specific topics.

For example:

```bash
React Server Components
```

or:

```bash
AI coding agents
```

The search system will return relevant news rather than only displaying the default WebDev news feed.

---

## 🗂️ Category Filtering

Users can switch between categories:

```bash
All
AI Models
Frontend
Backend
Dev Tools
Design
Strategy
```

Category filtering currently happens on the client using the data returned by the API.

---

## ⚡ TanStack Query

TanStack Query is used for server-state management.

Current configuration:

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      retry: 2,
    },
  },
});
```

This means news data is considered fresh for 30 minutes.

The planned architecture will additionally persist selected query data so that a browser refresh doesn't immediately require another request.

---

## 🎛️ Redux Toolkit

Redux Toolkit is used for client/UI state, rather than storing API responses.

Currently:

```bash
Redux
└── Sidebar
    └── isOpen
```

TanStack Query handles:

```bash
News
Loading
Errors
Caching
Refetching
Pagination
```

This keeps server state and client state separated.

---

# 🏗️ Architecture

### Current frontend flow

```bash
React
   ↓
News.jsx
   ↓
useNews()
   ↓
TanStack Query
   ↓
newsApi.js
   ↓
Axios
   ↓
Express API
```

### Planned production architecture

```bash
                    ┌──────────────┐
                    │    React     │
                    └──────┬───────┘
                           │
                    TanStack Query
                           │
                         Axios
                           │
                    ┌──────▼───────┐
                    │   Express    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
         Controllers   News Service   Middleware
                           │
                    ┌──────┴──────┐
                    │             │
                  Groq          MongoDB
                    │             │
                    └──────┬──────┘
                           │
                         Redis
```

---

# 📁 Project Structure

## Frontend

```bash
client/
└── src/
    │
    ├── features/
    │   │
    │   ├── news/
    │   │   ├── components/
    │   │   │   ├── NewsCard.jsx
    │   │   │   ├── NewsGrid.jsx
    │   │   │   └── CategoryTabs.jsx
    │   │   │
    │   │   ├── hooks/
    │   │   │   └── useNews.js
    │   │   │
    │   │   └── services/
    │   │       └── newsApi.js
    │   │
    │   └── sidebar/
    │       ├── components/
    │       │   └── Sidebar.jsx
    │       └── sidebarSlice.js
    │
    ├── lib/
    │   ├── axios.js
    │   └── queryClient.js
    │
    ├── pages/
    │   ├── Home.jsx
    │   └── News.jsx
    │
    ├── store/
    │   └── store.js
    │
    ├── App.jsx
    └── main.jsx
```

## Backend

Planned structure:

```bash
server/
│
├── controllers/
│   └── newsController.js
│
├── routes/
│   └── newsRoutes.js
│
├── services/
│   ├── newsService.js
│   └── aiService.js
│
├── models/
│   └── News.js
│
├── middleware/
│   ├── errorMiddleware.js
│   └── rateLimiter.js
│
├── config/
│   ├── database.js
│   └── redis.js
│
├── app.js
├── server.js
└── package.json
```

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- TanStack Query
- Redux Toolkit
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Redis

### AI

- Groq API
- LLM-based news summarization
- AI classification
- AI-powered search

### DevOps

- GitHub Actions
- Docker
- Vercel / cloud deployment

---

# 🔄 News Data Flow

The planned news pipeline:

```bash
News Sources
     ↓
Backend
     ↓
Fetch Articles
     ↓
Remove Duplicates
     ↓
AI Processing
     ↓
┌─────────────────────┐
│ Category            │
│ Summary             │
│ Keywords            │
│ Importance          │
└─────────────────────┘
     ↓
MongoDB
     ↓
Redis Cache
     ↓
Express API
     ↓
TanStack Query
     ↓
React UI
```

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/roshannaik123/news.git
```

Go into the project:

```bash
cd news
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

Open another terminal:

```bash
cd server
npm install
npm run dev
```

---

# 🔐 Environment Variables

### Client

Create:

```bash
client/.env
```

```bash
VITE_API_URL=http://localhost:5000/api
```

### Server

Create:

```bash
server/.env
```

Planned variables:

```bash
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key

REDIS_URL=your_redis_url
```

**Never commit `.env` files or API keys to GitHub.**

---

# 🎯 Learning Goals

This project is also designed to practice production-level concepts:

```bash
React
  ↓
Feature-based architecture
  ↓
TanStack Query
  ↓
REST API
  ↓
Express
  ↓
MongoDB
  ↓
Redis
  ↓
AI / LLM
  ↓
Caching
  ↓
Background processing
  ↓
Testing
  ↓
Docker
  ↓
CI/CD
  ↓
Production deployment
```

---

# 🗺️ Roadmap

### Phase 1 — Frontend

- Home page
- News page
- News cards
- Category filtering
- Sidebar
- Redux Toolkit
- TanStack Query

### Phase 2 — Backend

- Express server
- News endpoint
- Axios integration
- Controller/service architecture
- Error handling
- Validation

### Phase 3 — AI

- Groq integration
- AI prompts
- News summarization
- Category classification
- AI search

### Phase 4 — Data & Performance

- MongoDB
- Redis
- Persistent query cache
- Pagination
- Load More
- Deduplication

### Phase 5 — Production

- Authentication
- Rate limiting
- Logging
- Testing
- Docker
- CI/CD
- Monitoring
- Production deployment

---

# 👨‍💻 Author

**Roshan Naik**

GitHub: `roshannaik123`

---

## ⭐ Project Goal

The goal of WebDev Times is to evolve from a simple React news application into a production-grade full-stack AI application demonstrating modern frontend architecture, scalable backend design, AI integration, caching, and deployment practices.
