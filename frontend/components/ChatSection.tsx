"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "./Sidebar";

import MarkdownRenderer from "./MarkdownRenderer";

import TypingIndicator from "./TypingIndicator";

import RepositoryDashboard from "./RepositoryDashboard";

import {
  analyzeRepository,
  askQuestion,
} from "@/services/api";

import {
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  ChatSession,
  Message,
} from "@/types/chat";

import { typeWriterEffect } from "@/utils/typewriter";

import EmptyState from "./EmptyState";

export default function ChatSection() {

  // =========================
  // STATES
  // =========================

  const [repoUrl, setRepoUrl] = useState("");

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [typing, setTyping] = useState(false);

  const [repoAnalyzed, setRepoAnalyzed] = useState(false);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  const [currentChatId, setCurrentChatId] = useState("");

  const [repositoryStats, setRepositoryStats] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isRepoAnalyzed, setIsRepoAnalyzed] = useState(false);

  // =========================
  // SUGGESTED QUESTIONS
  // =========================

  const suggestedQuestions = [
    "Explain repository architecture",
    "What are the main API routes?",
    "How does authentication work?",
    "Explain database interactions?",
    "Which files are most important?",
    "Explain the project workflow",
  ];

  // =========================
  // LOAD CHATS
  // =========================

  useEffect(() => {

    const savedChats = localStorage.getItem("ai-repo-chats");

    if (savedChats) {

      const parsedChats: ChatSession[] = JSON.parse(savedChats);

      setChatSessions(parsedChats);

      if (parsedChats.length > 0) {

        const firstChat = parsedChats[0];

        setCurrentChatId(firstChat.id);

        setMessages(firstChat.messages);
      }
    }

  }, []);

  // =========================
  // SAVE CHATS
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "ai-repo-chats",
      JSON.stringify(chatSessions)
    );

  }, [chatSessions]);

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // =========================
  // CREATE NEW CHAT
  // =========================

  const createNewChat = () => {

    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Repository",
      messages: [],
      createdAt: Date.now(),
    };

    setChatSessions((prev) => [newChat, ...prev]);

    setCurrentChatId(newChat.id);

    setMessages([]);

    setRepoUrl("");

    setQuestion("");

    setRepoAnalyzed(false);

    setRepositoryStats(null);

    setIsRepoAnalyzed(false);
  };

  const deleteChat = (chatId: string) => {

    const updatedChats = chatSessions.filter(
      (chat) => chat.id !== chatId
    );

    setChatSessions(updatedChats);

    localStorage.setItem(
      "ai-repo-chats",
      JSON.stringify(updatedChats)
    );

    if (chatId === currentChatId) {

      if (updatedChats.length > 0) {

        const latestChat = updatedChats[0];

        setCurrentChatId(latestChat.id);

        setMessages(latestChat.messages);

      } else {

        setCurrentChatId("");

        setMessages([]);
      }
    }
  };

  // =========================
  // UPDATE CHAT SESSION
  // =========================

  const updateChatSession = (
    updatedMessages: Message[],
    title?: string
  ) => {

    setChatSessions((prev) =>
      prev.map((chat) => {

        if (chat.id === currentChatId) {

          return {
            ...chat,
            messages: updatedMessages,
            title: title || chat.title,
          };
        }

        return chat;
      })
    );
  };

  // =========================
  // SELECT CHAT
  // =========================

  const handleSelectChat = (chat: ChatSession) => {

    setCurrentChatId(chat.id);

    setMessages(chat.messages);

    setRepoAnalyzed(chat.messages.length > 0);
  };

  // =========================
  // ANALYZE REPOSITORY
  // =========================

  const handleAnalyzeRepository = async () => {

    if (!repoUrl.trim()) return;

    if (!currentChatId) {
      createNewChat();
      return;
    }

    setLoading(true);

    try {

      const response = await analyzeRepository(repoUrl);

      setIsRepoAnalyzed(true);

      // DASHBOARD DATA
      setRepositoryStats({
        repoName: response.repo_name,
        totalChunks: response.total_chunks,
        totalFiles: response.total_files,
        primaryLanguage: response.primary_language,
        framework: response.framework,
        detectedTechnologies: response.technologies,
      });

      const aiMessage: Message = {
        role: "ai",
        content: `${response.message} (${response.total_chunks} chunks indexed)`,
      };

      const updatedMessages: Message[] = [...messages, aiMessage];

      setMessages(updatedMessages);

      updateChatSession(
        updatedMessages,
        repoUrl.split("/").pop() || "Repository"
      );

      setRepoAnalyzed(true);

    } catch (error) {

      const errorMessage: Message = {
        role: "ai",
        content: "Failed to analyze repository",
      };

      const updatedMessages: Message[] = [...messages, errorMessage];

      setMessages(updatedMessages);

      updateChatSession(updatedMessages);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // ASK QUESTION
  // =========================

  const handleAskQuestion = async (customQuestion?: string) => {

    const finalQuestion = customQuestion || question;

    if (!isRepoAnalyzed) return;

    if (!finalQuestion.trim() || !repoAnalyzed) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: finalQuestion,
    };

    const updatedMessages: Message[] = [...messages, userMessage];

    setMessages(updatedMessages);

    updateChatSession(updatedMessages);

    setQuestion("");

    setLoading(true);

    try {

      const response = await askQuestion(finalQuestion);

      setTyping(true);

      const aiPlaceholder: Message = {
        role: "ai",
        content: "",
        sources: response.sources || [],
      };

      const streamingMessages = [...updatedMessages, aiPlaceholder];

      setMessages(streamingMessages);

      await typeWriterEffect(response.answer, (partialText) => {

        const updatedStreamingMessages: Message[] = [
          ...updatedMessages,
          {
            role: "ai" as const,
            content: partialText,
            sources: response.sources || [],
          },
        ];

        setMessages(updatedStreamingMessages);

        updateChatSession(updatedStreamingMessages);
      });

      setTyping(false);

    } catch (error) {

      const errorMessage: Message = {
        role: "ai",
        content: "Something went wrong.",
      };

      const finalMessages: Message[] = [...updatedMessages, errorMessage];

      setMessages(finalMessages);

      updateChatSession(finalMessages);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // SUGGESTED QUESTION CLICK
  // =========================

  const handleSuggestedQuestion = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
  };

  const handleDeleteChat = (id: string) => {

    const updatedChats = chatSessions.filter((chat) => chat.id !== id);

    setChatSessions(updatedChats);

    localStorage.setItem(
      "ai-repo-chats",
      JSON.stringify(updatedChats)
    );

    if (currentChatId === id) {

      if (updatedChats.length > 0) {

        const latestChat = updatedChats[0];

        setCurrentChatId(latestChat.id);

        setMessages(latestChat.messages);

      } else {

        setCurrentChatId("");

        setMessages([]);
      }
    }
  };

  const handleClearChats = () => {

    setChatSessions([]);

    setMessages([]);

    setCurrentChatId("");

    localStorage.removeItem("ai-repo-chats");
  };

  return (

    /* STEP 37.9 — overflow-x-hidden prevents horizontal scroll on mobile */
    <main className="flex h-screen overflow-hidden overflow-x-hidden w-full">

      {/* SIDEBAR */}
      <Sidebar
        chatSessions={chatSessions}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={createNewChat}
        onDeleteChat={handleDeleteChat}
        onClearChats={handleClearChats}
      />

      {/* MAIN CONTENT — min-w-0 prevents flex child overflow */}
      <section
        className="
          flex-1
          flex
          flex-col
          bg-[#020817]
          overflow-hidden
          min-w-0
        "
      >

        {/* HEADER — STEP 37.11: responsive padding */}
        <div
          className="
            border-b
            border-white/10
            p-4
            lg:p-8
            bg-[#0b1120]
            shrink-0
          "
        >

          <div className="flex items-start justify-between gap-3">

            <div>

              {/* STEP 37.4 — responsive heading */}
              <h1
                className="
                  text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-bold
                  text-white
                  tracking-tight
                "
              >
                CodeMind AI
              </h1>

              <p
                className="
                  text-zinc-400
                  mt-3
                  text-sm
                  lg:text-lg
                "
              >
                Analyze repositories using RAG + Groq + ChromaDB
              </p>

            </div>

            <div
              className="
                px-3
                py-2
                lg:px-5
                lg:py-3
                rounded-full
                bg-emerald-500/10
                border
                border-emerald-500/20
                text-emerald-400
                flex
                items-center
                gap-2
                shrink-0
                text-xs
                lg:text-sm
              "
            >

              <div
                className="
                  w-2
                  h-2
                  lg:w-3
                  lg:h-3
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                "
              />

              AI Online

            </div>

          </div>

        </div>

        {/* REPO INPUT — STEP 37.11: responsive padding */}
        <div
          className="
            p-4
            lg:p-8
            border-b
            border-white/10
            shrink-0
          "
        >

          {/* STEP 37.5 — stack on mobile, row on desktop */}
          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter GitHub repository URL..."
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAnalyzeRepository();
              }}
              className="
                flex-1
                w-full
                px-5
                py-4
                lg:px-6
                lg:py-5
                rounded-3xl
                bg-white/5
                border
                border-white/10
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-blue-500
                transition-all
                text-sm
                lg:text-lg
              "
            />

            {/* STEP 37.6 — full width on mobile */}
            <button
              onClick={handleAnalyzeRepository}
              disabled={loading}
              className="
                w-full
                lg:w-auto
                px-8
                py-4
                lg:py-5
                rounded-3xl
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                text-white
                font-semibold
                hover:scale-105
                transition-all
                disabled:opacity-50
                flex
                items-center
                justify-center
                gap-3
              "
            >

              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze
                </>
              )}

            </button>

          </div>

        </div>

        {/* CHAT AREA — STEP 37.11: responsive padding */}
        <div
          className="
            flex-1
            overflow-y-auto
            min-h-0
            px-4
            lg:px-8
            py-4
            lg:py-8
            space-y-6
            lg:space-y-8
          "
        >

          {/* REPOSITORY DASHBOARD */}
          {repositoryStats && (
            <RepositoryDashboard stats={repositoryStats} />
          )}

          {/* EMPTY STATE */}
          {messages.length === 0 && (
            <EmptyState />
          )}

          {/* CHAT MESSAGES */}
          {messages.map((message, index) => (

            <div
              key={index}
              className={`
                max-w-5xl
                rounded-3xl
                p-5
                lg:p-8
                border
                overflow-hidden
                ${
                  message.role === "user"
                    ? `
                      ml-auto
                      bg-blue-500/10
                      border-blue-500/20
                    `
                    : `
                      bg-white/5
                      border-white/10
                    `
                }
              `}
            >

              <MarkdownRenderer content={message.content} />

              {/* SOURCES */}
              {message.sources && message.sources.length > 0 && (

                <div
                  className="
                    mt-6
                    pt-5
                    border-t
                    border-white/10
                  "
                >

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-zinc-400
                      mb-3
                    "
                  >
                    Sources
                  </h3>

                  <div className="space-y-3">

                    {message.sources.map((source: any, idx: number) => (

                      <div
                        key={idx}
                        className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          border
                          border-white/10
                        "
                      >

                        <p className="text-blue-400 font-medium text-sm">
                          {source.file}
                        </p>

                        <p
                          className="
                            text-zinc-400
                            text-sm
                            mt-2
                            line-clamp-4
                          "
                        >
                          {source.content}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>

          ))}

          {typing && <TypingIndicator />}

          <div ref={messagesEndRef} />

        </div>

        {/* SUGGESTED QUESTIONS */}
        {repoAnalyzed && (

          <div className="px-4 lg:px-8 pb-3 lg:pb-4 flex flex-wrap gap-2 lg:gap-3">

            {suggestedQuestions.map((item, index) => (

              <button
                key={index}
                onClick={() => handleSuggestedQuestion(item)}
                className="
                  px-3
                  py-1.5
                  lg:px-4
                  lg:py-2
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-xs
                  lg:text-sm
                  text-zinc-300
                  hover:bg-blue-500/10
                  hover:border-blue-500/30
                  transition-all
                "
              >
                {item}
              </button>

            ))}

          </div>

        )}

        {/* INPUT BAR — STEP 37.11: responsive padding */}
        <div
          className="
            p-4
            lg:p-8
            border-t
            border-white/10
            bg-[#0b1120]
            shrink-0
          "
        >

          {/* STEP 37.7 — gap-3 */}
          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder={
                isRepoAnalyzed
                  ? "Ask anything about the repository..."
                  : "Analyze a repository first..."
              }
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={!isRepoAnalyzed}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAskQuestion();
              }}
              className="
                flex-1
                px-5
                py-4
                lg:px-6
                lg:py-5
                rounded-3xl
                bg-white/5
                border
                border-white/10
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-blue-500
                transition-all
                text-sm
                lg:text-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            />

            {/* STEP 37.8 — smaller on mobile */}
            <button
              onClick={() => handleAskQuestion()}
              disabled={!isRepoAnalyzed}
              className={`
                w-14
                h-14
                lg:w-16
                lg:h-16
                rounded-3xl
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                text-white
                flex
                items-center
                justify-center
                transition-all
                shrink-0

                ${
                  !isRepoAnalyzed
                    ? `
                      opacity-50
                      cursor-not-allowed
                    `
                    : `
                      hover:scale-105
                    `
                }
              `}
            >
              <Send size={20} />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}