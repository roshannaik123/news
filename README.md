# WebDev Times

WebDev Times is a news application for web-development and AI topics. The project has a React frontend and a lightweight Express backend, with a foundation for cached API data and future AI-powered news summaries.

## Latest updates

- Added a Node.js + Express backend for news data.
- Added the `GET /api/news` API route.
- Added request validation for `page` and `limit` query parameters.
- Added centralized API error handling and CORS support for the Vite frontend.
- Added a reusable Axios API client in the frontend.
- Added TanStack Query for API caching, retries, and server-state management.
- Added reusable news cards, a news grid, category tabs, and mock news data.
- Added the `useNews` hook to fetch news through the API client.
- Removed unused query-client code from the search page and a development console log from the home page.
- Added `.env` and `node_modules` exclusions to `.gitignore`.

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Data fetching: TanStack Query and Axios
- Client state: Redux Toolkit
- Backend: Node.js and Express

## Project structure

```text
news/
|- clinet/                  # React frontend
|  `- src/
|     |- components/        # Shared UI
|     |- features/          # News, search, AI, and sidebar features
|     |- lib/               # Axios and Query Client configuration
|     `- pages/             # App pages
`- server/                  # Express API
   |- controller/
   |- middleware/
   |- routes/
   `- services/
```

## Run the project

### 1. Start the backend

```bash
cd server
npm install
node server.js
```

The backend starts at `http://localhost:5000`.

### 2. Start the frontend

Open another terminal:

```bash
cd clinet
npm install
npm run dev
```

### 3. Configure the frontend API URL

Create `clinet/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend runs on `http://localhost:5173` by default.

## API

### Get news

```http
GET /api/news
```

Optional query parameters:

- `category` - Filters the news by category.
- `page` - Positive integer; defaults to `1`.
- `limit` - Integer between `1` and `50`; defaults to `10`.

Example:

```text
http://localhost:5000/api/news?category=Frontend
```

## Next planned improvements

- Connect real news or RSS sources
- Add Groq AI summaries and analysis
- Add search and pagination
- Store news in a database
- Add authentication, bookmarks, tests, Docker, and deployment configuration
