const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();

app.post('/sendMessage', async (req, res) => {
  const { chatId, text } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({chat_id: chatId, text}),
    });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({error: e.toString()});
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
