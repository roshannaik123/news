# WebDev Times

WebDev Times is a full-stack news app for web-development and AI updates. Its React frontend presents a daily news experience, while an Express API retrieves current articles from GNews.

## Features

- Web-development and AI news feed
- News cards, responsive grid, category tabs, sidebar, and live-news UI
- Category filtering in the client
- Axios API client with TanStack Query server-state fetching
- Redux Toolkit store setup
- Validated, paginated Express API with centralized error forwarding
- GNews-powered article search, duplicate-article removal, and category-based requests
- Groq-generated, developer-focused article summaries
- In-memory cache with a 30-minute lifetime

## Tech stack

- **Client:** React, Vite, React Router, Tailwind CSS
- **Data and state:** Axios, TanStack Query, Redux Toolkit
- **Server:** Node.js, Express
- **News provider:** GNews API
- **AI enrichment:** Groq

## Project structure

```text
news/
|- clinet/                 # Vite + React frontend
|  `- src/
|     |- components/       # Shared UI components
|     |- features/         # News, AI, search, and sidebar modules
|     |- pages/            # Route pages
|     `- lib/              # Axios and query-client setup
|- server/                 # Express API
|  |- controller/
|  |- middleware/
|  |- routes/
|  `- services/
`- README.md
```

> The frontend directory is named `clinet` in this repository.

## How news is processed

1. The client requests `GET /api/news` using Axios and TanStack Query.
2. The Express controller checks the category-and-date cache key.
3. On a cache miss, the server retrieves a page of English-language results from GNews.
4. Duplicate source articles are removed before the articles are sent to Groq.
5. Groq filters and reformats the results as developer-focused news.
6. The server caches page-one results or appends later pages to the same category/date cache entry.

Groq is instructed to return JSON only, merge duplicate events, score each story's importance from 1 to 10, and use only these categories: `AI`, `Dev Tools`, `Frontend`, `Backend`, `DevOps`, and `Security`.

## Cache design

The server uses an in-memory `Map` cache that expires entries after 30 minutes. A key is formed from the requested category and date:

```text
category + date
      ↓
  cache key
      ↓
┌───────────────┐
│  Page 1       │
│  Page 2       │
│  Page 3       │
└───────────────┘
      ↓
combined cache
      ↓
expires after 30 min
```

When page 1 is cached, the API returns only the requested `limit` from that cached list. Later pages are fetched, AI-processed, and appended to the cached results. The cache is process-local, so it is cleared whenever the Node.js server restarts.

## Prerequisites

- Node.js 18 or newer
- A [GNews API key](https://gnews.io/)

## Getting started

1. Clone the repository and install the server dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create `server/.env` and add your GNews key:

   ```env
   GNEWS_API_KEY=your_gnews_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

3. Start the API server:

   ```bash
   node server.js
   ```

   The API is available at `http://localhost:5000`.

4. In a second terminal, install and start the frontend:

   ```bash
   cd clinet
   npm install
   ```

5. Create `clinet/.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

6. Start Vite:

   ```bash
   npm run dev
   ```

   Open the URL shown by Vite (normally `http://localhost:5173`).

## API reference

### Get news

```http
GET /api/news
```

Supported query parameters:

| Parameter | Description | Default |
| --- | --- | --- |
| `category` | Search topic, such as `React` or `AI` | `web development` |
| `date` | Article date in `YYYY-MM-DD` format | N/A |
| `page` | Page number; must be a positive integer | `1` |
| `limit` | Results per page; from `1` to `50` | `10` |

Example:

```text
http://localhost:5000/api/news?category=React&date=2026-08-26&limit=10
```

Successful responses follow this shape:

```json
{
  "success": true,
  "source": "api",
  "page": 1,
  "data": []
}
```

## Available scripts

Run these from `clinet/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Environment variables

| File | Variable | Purpose |
| --- | --- | --- |
| `server/.env` | `GNEWS_API_KEY` | Authenticates requests to the GNews API |
| `server/.env` | `GROQ_API_KEY` | Authenticates requests to Groq for news enrichment |
| `clinet/.env` | `VITE_API_URL` | Base URL for the Express API |

Do not commit either `.env` file or expose API keys in the frontend.

## Roadmap

- Improve TanStack Query caching so categories are not refetched on return, previously loaded pages remain available, and loading more uses an infinite query.
- Optionally persist the TanStack Query cache with `localStorage` so data can survive a browser refresh.
- Cover pagination and cache edge cases, including different limits, page-two-first requests, duplicates across pages, and cache expiry.
- Make GNews category searches more developer-specific before AI filtering.
- Add keyword search, a live news ticker, and polished loading, error, and empty states.
- Add MongoDB for persistent news storage and Redis for a production-grade shared cache.
- Add production deployment configuration.

## License

This project is currently unlicensed.
