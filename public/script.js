function translateCode() {
    const inputCode = document.getElementById("inputCode").value;
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;
    const outputBox = document.getElementById("outputCode");

    if (!inputCode.trim()) {
        outputBox.value = "Please enter some code to translate!";
        return;
    }

    outputBox.value = "Translating... ⏳";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/chat/completions", true);  // Directly hitting OpenAI API
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");  // Replace with your OpenAI API key

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // When the request is complete
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                outputBox.value = response.choices[0].message.content.trim() || "Translation failed!";
            } else {
                console.error("Error:", xhr.status, xhr.responseText);
                outputBox.value = `❌ Error: ${xhr.status}. Check console for details!`;
            }
        }
    };

    const prompt = `Translate the following ${fromLang} code to ${toLang}:\n\n${inputCode}`;

    // Send the request with the data
    xhr.send(JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
            { role: "system", content: "You are a helpful AI that translates code." },
            { role: "user", content: prompt }
        ]
    }));
}
