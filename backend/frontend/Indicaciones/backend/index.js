const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Carga el prompt del asistente
const prompt = fs.readFileSync('./prompts/lia-system-message.md', 'utf8');

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Ejemplo de llamada a OpenAI (puedes usar HuggingFace o tu propio modelo)
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer TU_API_KEY_OPENAI`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend LÍA escuchando en puerto ${PORT}`);
});
