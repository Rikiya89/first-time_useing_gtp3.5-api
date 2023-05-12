const fetch = require("node-fetch");

const API_KEY = "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";

async function sleep(ms) {
    return new Promise ((resolve) => setTimeout(resolve, ms));
}
async function getChatbotResponse(prompt) {
    const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    };

    const data = {
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.status === 429) {
            console.error("Rate limit exceeded, waiting for 60 seconds");
            await sleep(60000); // Wait for 60 seconds
            return await getChatbotResponse(prompt); // Retry the request
        }

        if (!response.ok) {
            console.error("Error status:", response.status, response.statusText);
            return;
        }

        // ... rest of the function
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
}


(async () => {
    const prompt = "How do I make a chatbot with GPT-based AI and JavaScript?";
    const response = await getChatbotResponse(prompt);
    console.log("Chatbot response:", response);
})();
//this program is working with chatgtp-api but, this api had so many requests　 I can't get any response from davinci server.