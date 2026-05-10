"use client";

import {
  GitBranch,
  Database,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-80 h-screen border-r border-white/10 bg-white/5 backdrop-blur-xl p-6"
    >
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              CodeMind AI
            </h1>

            <p className="text-sm text-zinc-400">
              Repository Intelligence
            </p>
          </div>
        </div>
      </div>

     
      {/* Navigation */}
      <div className="space-y-4">

        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]">

          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-blue-400" />
          </div>

          <div>
            <h3 className="text-white font-medium">
              Repository Analysis
            </h3>

            <p className="text-xs text-zinc-400">
              Analyze GitHub repositories
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]">

          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>

          <div>
            <h3 className="text-white font-medium">
              AI Assistant
            </h3>

            <p className="text-xs text-zinc-400">
              Conversational code analysis
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]">

          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <h3 className="text-white font-medium">
              Vector Database
            </h3>

            <p className="text-xs text-zinc-400">
              Semantic search indexing
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="mt-10 p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">

        <h3 className="text-white font-semibold mb-2">
          AI-Powered Code Understanding
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed">
          Analyze repositories with semantic search and conversational AI.
        </p>
      </div>
    </motion.div>
  );
}