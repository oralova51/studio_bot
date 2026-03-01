

async function handleTildaWebhook(req, res) {
  try {
    const data = req.body;

    // Пример структуры Tilda webhook
    // {
    //   "name": "Olga",
    //   "phone": "+79123456789",
    //   "email": "olga@example.com"
    // }

    // const phone = data.phone;
    // const name = data.name || 'Клиент';

    // Сохраняем номер клиента, например, в базе или простом JSON (для минималки)
    // db.saveClient({ name, phone })

    // Отправляем сообщение в Telegram
    const telegramBotToken = process.env.STUDIO_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID; // твой ID или бот должен быть в группе

    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Новый клиент: ${JSON.stringify(data)}`
      })
    });

    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
}

module.exports = { handleTildaWebhook };