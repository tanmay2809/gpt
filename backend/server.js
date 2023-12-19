const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT =  5000;
app.use(cors({ origin: "*" }));
require("dotenv").config();
app.use(bodyParser.json());



// Endpoint to fetch response from ChatGPT API
app.post("/getChatResponse", async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer process.env.CHATGPTAPIKE",
        },
      }
    ); 
    console.log(response.data.choices[0])
    //console.log(response.data); // Log the response data
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response.data); // Log the response data
    console.error(error.response.status); // Log the response status
    console.error(error.response.headers); // Log the response headers
    console.error(error.config); // Log the request config
    res.status(400).json({ error: "Bad Request" }); // Send a 400 response
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
