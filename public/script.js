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

    // Make a request to your own server to handle the translation request
    fetch('https://vex-studio.vercel.app/translate', {  // Make sure to update to your server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputCode,
            fromLang,
            toLang
        })
    })
    .then(response => response.json())
    .then(data => {
        outputBox.value = data.translatedCode || "Translation failed!";
    })
    .catch(error => {
        console.error("Error:", error);
        outputBox.value = "❌ Error: Failed to translate code.";
    });
}
