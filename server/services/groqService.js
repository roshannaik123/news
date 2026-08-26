import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "openai/gpt-oss-120b";

export const generateNewsWithGroq = async (articles) => {

    if (!articles || articles.length === 0) {
        throw new Error("No articles provided");
    }

    const formattedArticles = articles.map((article, index) => ({
        index: index + 1,
        id: article.id,
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source?.name
    }));

    const prompt = `
You are WebDev Times, a technology news platform for software developers.

Your job is to analyze the supplied news articles and create developer-focused
technology news.

IMPORTANT:

USE ONLY THE INFORMATION PROVIDED IN THE ARTICLES.

DO NOT:
- invent facts
- invent statistics
- invent benchmark scores
- invent version numbers
- invent pricing
- invent quotes
- invent dates
- invent features
- invent company announcements

If information is not present in the supplied articles, do not claim it.

--------------------------------------------------

ALLOWED CATEGORIES

Only generate news belonging to these categories:

1. AI
2. Dev Tools
3. Frontend
4. Backend
5. DevOps
6. Security

--------------------------------------------------

REJECT THESE:

- Politics
- Entertainment
- Sports
- General finance
- General economy
- Healthcare
- Celebrity news
- General business news
- Marketing news
- Non-technical company announcements
- Stories unrelated to software developers

--------------------------------------------------

DEVELOPER RELEVANCE

Prefer stories involving:

AI models
AI APIs
LLMs
Open-source AI
AI coding tools
React
Next.js
Vite
Vue
Angular
Svelte
Tailwind
Node.js
Express
Bun
Deno
GitHub
GitHub Copilot
Cursor
Windsurf
VS Code
npm
Docker
Kubernetes
AWS
Cloudflare
Vercel
Databases
APIs
Authentication
Cybersecurity
CVEs
Developer tools
Open-source projects

--------------------------------------------------

DUPLICATES

Multiple articles may describe the same event.

If two or more articles describe the same event:

- combine them
- keep the strongest source
- produce only ONE story

Never generate duplicate stories.

--------------------------------------------------

OUTPUT

Generate exactly 10 stories if there are enough relevant articles.

If there are fewer than 10 genuinely relevant stories, return only the
number of valid stories available.

Do NOT invent stories just to reach 10.

Return ONLY valid JSON.

No markdown.
No code fences.
No explanation.

Each object must have exactly:

{
    "id": "string",
    "title": "string",
    "summary": "string",
    "technologies": ["string"],
    "relevance": "High" | "Medium" | "Low",
    "category": "AI" | "Dev Tools" | "Frontend" | "Backend" | "DevOps" | "Security",
    "importance": number,
    "source": "string",
    "url": "string"
}

--------------------------------------------------

TITLE

Make the title specific and interesting.

Avoid generic titles such as:

"New AI update released"

Prefer:

"Open-source model challenges commercial AI APIs"

--------------------------------------------------

SUMMARY

Write 2-3 sentences.

Explain:

1. What happened?
2. Why does it matter to developers?

Do not add information that isn't present in the source article.

--------------------------------------------------

TECHNOLOGIES

List the actual technologies mentioned in the article.

--------------------------------------------------

IMPORTANCE

Score from 1-10.

10 = extremely important for developers
8-9 = major developer impact
6-7 = meaningful developer impact
4-5 = moderate relevance
1-3 = weak relevance

--------------------------------------------------

ARTICLES

${JSON.stringify(formattedArticles, null, 2)}
`;

    const completion = await groq.chat.completions.create({
        model: MODEL,

        messages: [
            {
                role: "system",
                content:
                    "You are a strict technology news editor. Never fabricate information."
            },
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.3,

        max_tokens: 6000,

        response_format: {
            type: "json_object"
        }
    });

    const text =
        completion.choices[0]?.message?.content || "{}";

    const parsed = JSON.parse(text);

    // Our model may return { news: [...] }
    // or { articles: [...] }
    // depending on its response.

    if (Array.isArray(parsed)) {
        return parsed;
    }

    if (Array.isArray(parsed.news)) {
        return parsed.news;
    }

    if (Array.isArray(parsed.articles)) {
        return parsed.articles;
    }

    throw new Error("Groq returned invalid news format");
};