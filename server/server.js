const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const OPENAI_API_KEY = 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;  // Set this in .env file

app.post("/translate", async (req, res) => {
    const { inputCode, fromLang, toLang } = req.body;

    const prompt = `Translate the following ${fromLang} code to ${toLang}:\n\n${inputCode}`;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "You are a helpful AI that translates code." }, { role: "user", content: prompt }],
        }, {
            headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" }
        });

        res.json({ translatedCode: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ translatedCode: "Error translating code!" });
    }
});

app.listen(3000, () => console.log("Vex Studio Server running on port 3000"));
