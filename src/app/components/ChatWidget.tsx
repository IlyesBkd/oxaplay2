"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function ChatWidget() {
  const t = useTranslations('Chat');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"email" | "chat">("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  
  useEffect(() => {
    setInitialMessage(t('greeting'));
  }, [t]);
  
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([{ from: "bot", text: initialMessage }]);
    }
  }, [initialMessage, messages.length]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setStep("chat");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    const userMsg = message.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setMessage("");
    setSending(true);

    // Show typing indicator
    setMessages((prev) => [...prev, { from: "bot", text: "..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: userMsg }),
      });

      const data = await res.json();

      // Remove typing indicator and add reply
      setMessages((prev) => [
        ...prev.filter((m) => m.text !== "..."),
        { from: "bot", text: data.reply || t('messageSent') },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.text !== "..."),
        { from: "bot", text: t('connectionError') },
      ]);
    }

    setSending(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[90] w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-32 right-2 left-2 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[360px] z-[90] max-h-[70vh] sm:max-h-[500px] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t('supportTitle')}</p>
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {t('online')}
                </p>
              </div>
            </div>
          </div>

          {/* Step: Email gate */}
          {step === "email" && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-white font-medium mb-1">{t('beforeStart')}</p>
              <p className="text-xs text-zinc-500 mb-5 text-center">{t('enterEmail')}</p>
              <form onSubmit={handleEmailSubmit} className="w-full space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                  placeholder={t('emailPlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-800/50 border text-white placeholder:text-zinc-600 text-sm focus:outline-none transition-all duration-300 ${
                    emailError ? "border-red-500/50" : "border-zinc-700 focus:border-zinc-500"
                  }`}
                  autoFocus
                />
                {emailError && <p className="text-xs text-red-400">{t('invalidEmail')}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-zinc-950 text-sm font-semibold transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {t('startChat')}
                </button>
              </form>
            </div>
          )}

          {/* Step: Chat */}
          {step === "chat" && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[280px] max-h-[340px]">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-white text-zinc-950 rounded-br-md"
                          : msg.text === "..."
                          ? "bg-zinc-800/50 border border-zinc-800 text-zinc-500 rounded-bl-md animate-pulse"
                          : "bg-zinc-800/50 border border-zinc-800 text-zinc-300 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="px-4 py-3 border-t border-zinc-800 shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messagePlaceholder')}
                    disabled={sending}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-all duration-300 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center transition-all duration-300 hover:bg-zinc-200 disabled:opacity-30 shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
