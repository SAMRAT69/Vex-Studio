const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // In production, restrict this to allowed domains

// Directly set your OpenAI API key here
const OPENAI_API_KEY = "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";  // Your API Key

// Define the translation endpoint
app.post("/translate", async (req, res) => {
    const { inputCode, fromLang, toLang } = req.body;

    // Validate the incoming request
    if (!inputCode || !fromLang || !toLang) {
        return res.status(400).json({ translatedCode: "Missing input data!" });
    }

    const prompt = `Translate the following ${fromLang} code to ${toLang}:\n\n${inputCode}`;

    try {
        // Make request to OpenAI API to translate code
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "You are a helpful AI that translates code." },
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        // Send translated code as response
        res.json({ translatedCode: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ translatedCode: "Error translating code!" });
    }
});

// Start the server
app.listen(3000, () => console.log("Vex Studio Server running on port 3000"));
