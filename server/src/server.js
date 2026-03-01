const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { handleTildaWebhook } = require("./tildaWebHook");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

dotenv.config();

const TOKEN = process.env.STUDIO_BOT_TOKEN;
console.log("TOKEN:",TOKEN);
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const PORT = process.env.PORT || 3000;

// 🔹 Обработка webhook от Telegram
app.post("/webhook", async (req, res) => {
  console.log("Received webhook request:", req.body);
  const message = req.body.message;

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Ты написал: ${text}`
    });
  }

  res.sendStatus(200);
});

app.post('/tilda-webhook', handleTildaWebhook);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});