"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  ArrowUp,
  Sparkles,
  Loader2,
} from "lucide-react";

import API from "@/services/api";

import TypingIndicator from "./TypingIndicator";

import { typeWriterEffect } from "@/utils/typewriter";



interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatSection() {

  const [repoUrl, setRepoUrl] = useState("");

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [typing, setTyping] = useState(false);

  const [repoAnalyzed, setRepoAnalyzed] = useState(false);

  // Analyze Repository
  const analyzeRepository = async () => {

    if (!repoUrl) return;

    try {

      setLoading(true);

      const response = await API.post(
        "/analyze",
        {
          repo_url: repoUrl,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            response.data.message +
            ` (${response.data.total_chunks} chunks indexed)`
        }
      ]);

      setRepoAnalyzed(true);

    } catch (error: any) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            error.response?.data?.error ||
            "Failed to analyze repository"
        }
      ]);

    } finally {

      setLoading(false);
    }
  };

  // Ask AI
  const askQuestion = async () => {

    if (!question) return;

    const userMessage = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage
      }
    ]);

    setQuestion("");

    try {

      setLoading(true);

      const response = await API.post(
        "/chat",
        {
          question: userMessage
        }
      );

      setTyping(true);

const aiMessage = {
  role: "ai" as const,
  content: ""
};

setMessages((prev) => [
  ...prev,
  aiMessage
]);

await typeWriterEffect(
  response.data.answer,
  (typedText) => {

    setMessages((prev) => {

      const updated = [...prev];

      updated[updated.length - 1] = {
        role: "ai",
        content: typedText
      };

      return updated;
    });
  }
);

setTyping(false);

    } catch (error: any) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            error.response?.data?.error ||
            "Something went wrong"
        }
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="flex-1 flex flex-col h-screen overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-white/10 backdrop-blur-xl bg-white/5 px-10 py-6"
      >

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              AI Repository Assistant
            </h1>

            <p className="text-zinc-400 mt-2 text-sm">
              Analyze repositories using RAG + Groq + ChromaDB
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">

            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />

            <span className="text-emerald-300 text-sm font-medium">
              AI Online
            </span>

          </div>
        </div>
      </motion.div>

      {/* Repository Input */}
      <div className="px-10 py-6 border-b border-white/10">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter GitHub repository URL..."
            value={repoUrl}
            onChange={(e) =>
              setRepoUrl(e.target.value)
            }
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <button
            onClick={analyzeRepository}
            disabled={loading}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all duration-300 font-medium"
          >

            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Analyze"
            )}

          </button>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">

        {messages.length === 0 && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl"
          >

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">

                  <Sparkles className="w-5 h-5 text-white" />

                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    AI Assistant
                  </h3>

                  <p className="text-xs text-zinc-400">
                    Powered by semantic search
                  </p>

                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed">
                Analyze any GitHub repository and ask architecture,
                implementation, workflow, and business logic questions.
              </p>

            </div>
          </motion.div>
        )}

        {messages.map((message, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-4xl rounded-3xl p-5 border ${
              message.role === "user"
                ? "ml-auto bg-blue-500/10 border-blue-500/20"
                : "bg-white/5 border-white/10"
            }`}
          >

            <p className="text-zinc-100 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>

          </motion.div>
        ))}

        {typing && (

  <div className="bg-white/5 border border-white/10 rounded-3xl w-fit">
    <TypingIndicator />
  </div>

)}

      </div>

      {/* Input */}
      <div className="border-t border-white/10 backdrop-blur-xl bg-white/5 px-10 py-6">

        <div className="max-w-5xl mx-auto">

          <div className="flex items-end gap-4 bg-white/5 border border-white/10 rounded-3xl p-4">

            <textarea
              rows={1}
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Ask anything about the repository..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 resize-none outline-none text-base"
            />

            <button
              onClick={askQuestion}
              disabled={!repoAnalyzed || loading}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >

              {loading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5 text-white" />
              )}

            </button>

          </div>

          <p className="text-center text-xs text-zinc-500 mt-4">
            AI responses are generated using repository context and semantic retrieval.
          </p>

        </div>
      </div>
    </div>
  );
}