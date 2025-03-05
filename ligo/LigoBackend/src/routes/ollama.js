const express = require("express");
const router = express.Router();
const axios = require("axios");
// Route to send prompt to Ollama and return response
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  console.log("Received prompt:", prompt);
  try {
    // Send request to Ollama API
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2",
        prompt: prompt,
      },
      {
        responseType: "stream", // Handle the response as a stream
      }
    );
    let fullResponse = "";
    // Process the stream of tokens
    response.data.on("data", (chunk) => {
      try {
        const token = JSON.parse(chunk.toString());
        if (token.response) {
          fullResponse += token.response; // Concatenate the response text
        }
      } catch (parseError) {
        console.error("Error parsing chunk:", parseError.message);
      }
    });
    // Handle the end of the stream
    response.data.on("end", () => {
      console.log("Full response from Ollama:", fullResponse);
      res.json({ data: fullResponse }); // Send the concatenated response back to the client
    });
    // Handle errors in the stream
    response.data.on("error", (err) => {
      console.error("Stream error:", err.message);
      res.status(500).json({ error: "Error processing Ollama response" });
    });
  } catch (error) {
    console.error("Error communicating with Ollama:", error.message);
    res.status(500).json({ error: "Failed to connect to Ollama" });
  }
});
module.exports = router;