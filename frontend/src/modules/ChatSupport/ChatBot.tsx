import React, { useState } from 'react';
import api from '../../api/axiosInstance';
import { MessageSquare, Send, ShieldAlert, User, Bot, Loader2 } from 'lucide-react';

export const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await api.post('/webhook/whatsapp', { from: "Web-Demo", message: input });

      const botMsg = {
        role: 'bot',
        text: res.data.reply,
        escalated: res.data.shouldEscalate
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[550px] max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <h2 className="flex items-center gap-2 font-semibold">
          <MessageSquare size={18} />
          AI Support Assistant
        </h2>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Online
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">
            Ask about orders, refunds, or sustainability 🌱
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Avatar */}
            {m.role === "bot" && (
              <div className="p-2 bg-emerald-100 rounded-full">
                <Bot size={16} className="text-emerald-600" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] p-3 rounded-xl text-sm shadow ${
                m.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
              }`}
            >
              {m.text}

              {m.escalated && (
                <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold text-red-500 uppercase">
                  <ShieldAlert size={12} />
                  Escalated to Human
                </div>
              )}
            </div>

            {/* User Avatar */}
            {m.role === "user" && (
              <div className="p-2 bg-gray-200 rounded-full">
                <User size={16} className="text-gray-700" />
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Loader2 size={14} className="animate-spin" />
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-white border-t flex items-center gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about your order..."
          className="flex-1 text-sm p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-400"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
