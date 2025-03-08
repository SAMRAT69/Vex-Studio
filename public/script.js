async function translateCode() {
    const inputCode = document.getElementById("inputCode").value;
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;
    const outputBox = document.getElementById("outputCode");

    if (!inputCode.trim()) {
        outputBox.value = "Please enter some code to translate!";
        return;
    }

    outputBox.value = "Translating... ⏳";

    try {
        const response = await fetch("https://vex-studio.vercel.app/translate", {  // Ensure URL is correct
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputCode, fromLang, toLang })
        });

        if (!response.ok) {
            throw new Error("Translation failed. Server error!");
        }

        const data = await response.json();
        outputBox.value = data.translatedCode || "Translation failed!";
    } catch (error) {
        console.error("Error:", error);
        outputBox.value = `❌ Error: ${error.message}. Check the console for details!`;
    }
}
