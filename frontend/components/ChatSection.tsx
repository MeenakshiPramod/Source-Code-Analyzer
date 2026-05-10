"use client";

import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";

export default function ChatSection() {
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
              Understand any codebase using AI-powered semantic analysis.
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

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  AI Assistant
                </h3>

                <p className="text-xs text-zinc-400">
                  Powered by RAG + Groq + ChromaDB
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              Welcome! Analyze any GitHub repository and ask questions about architecture, authentication, APIs, workflows, business logic, and implementation details.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 backdrop-blur-xl bg-white/5 px-10 py-6">

        <div className="max-w-5xl mx-auto">

          <div className="flex items-end gap-4 bg-white/5 border border-white/10 rounded-3xl p-4 shadow-xl backdrop-blur-xl">

            <textarea
              rows={1}
              placeholder="Ask anything about the repository..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 resize-none outline-none text-base"
            />

            <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20">
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-4">
            AI responses are generated using semantic retrieval and repository context.
          </p>
        </div>
      </div>
    </div>
  );
}
