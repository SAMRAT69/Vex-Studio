async function translateCode() {
    const inputCode = document.getElementById("inputCode").value;
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;

    const response = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputCode, fromLang, toLang })
    });

    const data = await response.json();
    document.getElementById("outputCode").value = data.translatedCode || "Translation failed!";
}
