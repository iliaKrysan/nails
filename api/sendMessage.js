export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chatId, text } = req.body;
    
    // Проверяем обязательные поля
    if (!chatId || !text) {
      return res.status(400).json({ error: 'chatId and text are required' });
    }

    // Получаем токен из переменных окружения
    const token = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!token) {
      return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not configured' });
    }

    // Отправляем сообщение в Telegram
    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: chatId,
        text: message
      }),
    });

    const data = await response.json();

    if (data.ok) {
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send message', details: data.description });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}