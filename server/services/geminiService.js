import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateNews = async () => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: `
        Find the latest web development and AI news from today.

        Focus on:
        - React
        - JavaScript
        - Frontend
        - Backend
        - Node.js
        - AI
        - Developer tools

        Give me 5 important news stories.
        Include the title, summary, source and publication date.
        `,

        config: {
            tools: [
                {
                    googleSearch: {},
                },
            ],
        },
    });

    console.log(response.text);

    return response.text;
};