# WebDev Times

WebDev Times is a full-stack news dashboard for web development and AI news. It fetches articles from GNews, removes duplicates, and uses Groq to curate developer-focused results.

## Stack

- **Frontend:** React, Vite, React Router, TanStack Query, Redux Toolkit
- **Backend:** Node.js, Express
- **News:** GNews API
- **AI:** Groq

## Features

- Browse news by category and date
- Responsive news cards, navigation, sidebar, and live ticker
- AI-curated summaries and analysis
- Duplicate-article filtering
- Request validation and centralized API error handling
- In-memory server cache with a 30-minute expiry

## Project layout

```text
news/
├── clinet/       # React + Vite frontend
└── server/       # Express API
```

> The frontend folder is intentionally named `clinet` in this repository.

## Prerequisites

- Node.js 18 or newer
- A [GNews API key](https://gnews.io/)
- A Groq API key

## Run locally

Install and configure the API:

```bash
cd server
npm install
```

Create `server/.env`:

```env
GNEWS_API_KEY=your_gnews_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the API on port 5000:

```bash
node server.js
```

In a second terminal, install and start the frontend:

```bash
cd clinet
npm install
```

Create `clinet/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Vite prints the local app URL, usually `http://localhost:5173`.

## API

### `GET /api/news`

| Query parameter | Description | Default |
| --- | --- | --- |
| `category` | News topic, such as `React` or `AI` | `all` |
| `date` | Article date in `YYYY-MM-DD` format | latest news |
| `page` | Positive page number | `1` |
| `limit` | Articles to return (1–50) | `10` |

Example:

```text
http://localhost:5000/api/news?category=AI&limit=10
```

## Client scripts

Run these from `clinet/`:

```bash
npm run dev      # Start the development server
npm run build    # Build for production
npm run preview  # Preview a production build
npm run lint     # Lint the frontend
```

## Environment variables

Never commit `.env` files or expose API keys in the frontend.

| File | Variable | Purpose |
| --- | --- | --- |
| `server/.env` | `GNEWS_API_KEY` | GNews authentication |
| `server/.env` | `GROQ_API_KEY` | Groq authentication |
| `clinet/.env` | `VITE_API_URL` | Express API base URL |
