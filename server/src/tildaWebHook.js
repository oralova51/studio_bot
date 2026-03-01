const fetch = require('node-fetch'); // если Node < 18

async function handleTildaWebhook(req, res) {
  try {
    const data = req.body;

    // 🔹 Логируем полностью объект, чтобы видеть, что пришло
    console.log("Webhook Tilda POST data:", data);

    // 🔹 Пример: извлекаем имя и телефон
    const name = data.name || 'Клиент';
    const phone = data.phone || 'не указан';

    // 🔹 Отправляем сообщение в Telegram
    const telegramBotToken = process.env.STUDIO_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Новый клиент: ${name}, тел: ${phone}`
      })
    });

    // 🔹 Отвечаем Tilda, что запрос успешно обработан
    res.status(200).send('OK');
  } catch (err) {
    console.error("Ошибка при обработке webhook Tilda:", err);
    res.status(500).send('Error');
  }
}

module.exports = { handleTildaWebhook };