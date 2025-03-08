const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mockTranslations = {
    "lua": {
        "javascript": (code) => `// Translated from Lua to JavaScript\n${code.replace("print", "console.log")}`
    },
    "javascript": {
        "lua": (code) => `-- Translated from JavaScript to Lua\n${code.replace("console.log", "print")}`
    },
    "python": {
        "javascript": (code) => `// Translated from Python to JavaScript\n${code.replace("print", "console.log")}`
    },
    "javascript": {
        "python": (code) => `# Translated from JavaScript to Python\n${code.replace("console.log", "print")}`
    }
};

app.post("/translate", (req, res) => {
    const { inputCode, fromLang, toLang } = req.body;
    
    if (mockTranslations[fromLang] && mockTranslations[fromLang][toLang]) {
        const translatedCode = mockTranslations[fromLang][toLang](inputCode);
        res.json({ translatedCode });
    } else {
        res.json({ translatedCode: "Translation not supported yet!" });
    }
});

app.listen(3000, () => console.log("Vex Studio Server running on port 3000"));
