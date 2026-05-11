const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
    origin: "https://leolloyd14-stu.github.io",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        reply: "Too many requests. Please try again later."
    }
});

app.use("/chat", limiter);

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const sessionMemory = new Map();

app.get("/", (req, res) => {
    res.send("Calm Garden backend is running 🌿");
});

app.post("/chat", async (req, res) => {
    try {
        console.log("Using model: gpt-5-mini");
        const { message, sessionId } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                reply: "Please type a message first."
            });
        }

        if (!sessionId) {
            return res.status(400).json({
                reply: "Missing session ID."
            });
        }

        if (!sessionMemory.has(sessionId)) {
            sessionMemory.set(sessionId, []);
        }

        const history = sessionMemory.get(sessionId);

        history.push({
            role: "user",
            content: message
        });

        const response = await client.responses.create({
            model: "gpt-5.4-mini",
            input: [
                {
                    role: "system",
                    content: `
You are Calm Garden AI, a kind stress-management adolescent psychological assistant for students.
You remember the conversation only during this current session.
Give supportive, practical advice about school stress, exams, anxiety, relaxation, journaling and wellbeing.
Keep answers short, concise, calm and easy to understand.
Words should not exceed 100 count.  
Make response as intelligent and assuring as possible by looking into certified psychological platforms such as Teen Counselling and TalkSpace for Teens
Do not diagnose medical conditions.
If the user sounds unsafe or in danger, tell them to speak to a trusted adult, teacher, counsellor or emergency support immediately.
`
                },
                ...history
            ]
        });

        const aiReply = response.output_text;

        history.push({
            role: "assistant",
            content: aiReply
        });

        if (history.length > 12) {
            sessionMemory.set(sessionId, history.slice(-12));
        }

        res.json({
            reply: aiReply
        });

    } catch (error) {
        console.error("OPENAI ERROR:", error.message);

        res.status(500).json({
            reply: "Sorry, something went wrong. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Calm Garden server running on port ${PORT}`);
});