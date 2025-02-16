const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/generate-audio", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/WkdNt6YZyWsuI19rQrAd?output_format=mp3_44100_128",
      {
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          voice_speed: 0.8,
        },
      },
      {
        headers: {
          "xi-api-key": "sk_b5e731a7220eea50ccd5b3e57a1872ad36210bc9a6c936fa",
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
