"use client";

import { MessageSquarePlus } from "lucide-react";

import { ChatSession }
from "@/types/chat";

interface SidebarProps {

  chatSessions: ChatSession[];

  currentChatId: string;

  onSelectChat: (
    chat: ChatSession
  ) => void;

  onNewChat: () => void;
}

export default function Sidebar({

  chatSessions,

  currentChatId,

  onSelectChat,

  onNewChat,

}: SidebarProps) {

  return (

    <aside
      className="
        w-[340px]
        bg-[#07111f]
        border-r
        border-white/10
        flex
        flex-col
      "
    >

      {/* HEADER */}

      <div
        className="
          p-6
          border-b
          border-white/10
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-white
            leading-tight
          "
        >

          AI Repo
          Assistant

        </h1>

        <p
          className="
            text-zinc-400
            mt-2
          "
        >

          Chat History

        </p>

      </div>

      {/* NEW CHAT */}

      <div className="p-4">

        <button
          onClick={onNewChat}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            text-white
            font-semibold
            hover:scale-[1.02]
            transition-all
          "
        >

          <MessageSquarePlus
            size={20}
          />

          New Chat

        </button>

      </div>

      {/* CHAT LIST */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          pb-4
          space-y-3
        "
      >

        {chatSessions.map(
          (chat) => (

            <button
              key={chat.id}
              onClick={() =>
                onSelectChat(chat)
              }
              className={`
                w-full
                text-left
                p-5
                rounded-2xl
                border
                transition-all
                ${
                  currentChatId ===
                  chat.id
                    ? `
                      bg-blue-500/20
                      border-blue-500/30
                    `
                    : `
                      bg-white/5
                      border-white/10
                      hover:bg-white/10
                    `
                }
              `}
            >

              <h3
                className="
                  text-white
                  font-medium
                  truncate
                "
              >

                {chat.title}

              </h3>

              <p
                className="
                  text-zinc-400
                  text-sm
                  mt-2
                "
              >

                {new Date(
                  chat.createdAt
                ).toLocaleDateString()}

              </p>

            </button>

          )
        )}

      </div>

    </aside>
  );
}