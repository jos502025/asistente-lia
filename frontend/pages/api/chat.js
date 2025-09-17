import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userMessage = req.body.message;
    const prompt = `
Eres LiA, asistente virtual especializado en consultoría inmobiliaria en México.
Tu propósito es guiar a asesores inmobiliarios en cada etapa del modelo de ventas consultivas de LÍA...
(agrega aquí el prompt completo)
    `;
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage }
        ],
      });
      res.status(200).json({ reply: completion.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
