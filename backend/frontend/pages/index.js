import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    setLoading(true);
    const userMsg = { sender: "usuario", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMsg = { sender: "lia", text: data.reply };
    setMessages((msgs) => [...msgs, botMsg]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 32 }}>
      <h1>Asistente LÍA</h1>
      <div style={{ minHeight: 300, marginBottom: 16 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "lia" ? "left" : "right", margin: 4 }}>
            <b>{msg.sender === "lia" ? "LÍA:" : "Tú:"}</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", marginRight: 8 }}
        placeholder="Escribe tu mensaje"
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}
