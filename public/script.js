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

    // Make a request to your server to handle the translation request
    fetch('https://vex-studio.vercel.app/translate', {  // Ensure this URL is correct for production
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
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Ensure response contains translated code
        if (data && data.translatedCode) {
            outputBox.value = data.translatedCode.trim() || "Translation failed!";
        } else {
            outputBox.value = "❌ No translation available.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        outputBox.value = `❌ Error: ${error.message}`;
    });
}
