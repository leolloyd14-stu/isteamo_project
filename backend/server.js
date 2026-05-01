const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
   res.send("Calm Garden backend is running 🌿");
});

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("Calm Garden backend is running 🌿");
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                reply: "Please type a message first."
            });
        }

        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: `
You are Calm Garden AI, a kind stress-management assistant for students.
Give supportive, practical advice about school stress, exams, anxiety, relaxation, journaling and wellbeing.
Keep answers short, calm and easy to understand.
Do not diagnose medical conditions.
If the user sounds unsafe or in danger, tell them to speak to a trusted adult, teacher, counsellor or emergency support immediately.

Student message: ${message}
`
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            reply: "Sorry, something went wrong. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Calm Garden server running on port ${PORT}`);
});