const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
     //  model: "llama3",
     model: "mistral",
      prompt: message,
      stream: false,
        options: {
          num_predict: 60,   // limit output
          temperature: 0.7
          }
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("API running on port 3000"));