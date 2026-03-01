const axios = require('axios');

async function handleTildaWebhook(req, res) {
  try {
    const data = req.body;
    console.log("Webhook Tilda body:", data);

    const telegramBotToken = process.env.STUDIO_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !chatId) {
      console.error("Нет токена бота или chat_id");
      return res.status(500).send("Нет токена бота или chat_id");
    }

    // ✅ Правильный вызов axios.post
    await axios.post(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        chat_id: chatId,
        text: `📌 Новый клиент: ${JSON.stringify(data)}`
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    res.status(200).send('OK');
  } catch (err) {
    console.error("Ошибка при обработке webhook Tilda:", err.message);
    console.error(err.stack);
    res.status(500).send('Error');
  }
}

module.exports = { handleTildaWebhook };