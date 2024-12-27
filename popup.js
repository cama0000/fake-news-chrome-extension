document.getElementById("check-btn").addEventListener("click", async () => {
    const urlInput = document.getElementById("url-input");
    const result = document.getElementById("result");
    const url = urlInput.value.trim();
  
    if (!url) {
      result.textContent = "Please enter a valid URL.";
      result.style.color = "red";
      return;
    }
  
    result.textContent = "Checking...";
    result.style.color = "black";
  
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ url, model: "lstm" }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.prediction > 0.5) {
          result.textContent = `Real news with ${(data.prediction * 100).toFixed(2)}% confidence.`;
          result.style.color = "green";
        } else {
          result.textContent = `Fake news with ${((1 - data.prediction) * 100).toFixed(2)}% confidence.`;
          result.style.color = "red";
        }
      } else {
        result.textContent = `Error: ${data.error || "Something went wrong."}`;
        result.style.color = "red";
      }
    } catch (error) {
      result.textContent = `Network Error: ${error.message}`;
      result.style.color = "red";
    }
  });
  