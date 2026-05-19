"use client";

import { MessageSquare } from "lucide-react";

import { ChatSession }
from "@/types/chat";

interface Props {

  chatSessions: ChatSession[];

  currentChatId: string;

  onSelectChat: (
    chat: ChatSession
  ) => void;
}

export default function Sidebar({

  chatSessions,

  currentChatId,

  onSelectChat,

}: Props) {

  return (

    <div
      className="
        w-80
        h-screen
        border-r
        border-white/10
        bg-[#0B1120]
        flex
        flex-col
      "
    >

      {/* Header */}
      <div
        className="
          p-6
          border-b
          border-white/10
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-white
          "
        >

          AI Repo Assistant

        </h1>

        <p
          className="
            text-zinc-400
            text-sm
            mt-1
          "
        >

          Chat History

        </p>

      </div>

      {/* Chat List */}
      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          space-y-3
        "
      >

        {chatSessions.map((chat) => (

          <button
            key={chat.id}

            onClick={() =>
              onSelectChat(chat)
            }

            className={`
              w-full
              text-left
              p-4
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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <MessageSquare
                size={18}
                className="
                  text-blue-400
                "
              />

              <div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                    truncate
                  "
                >

                  {chat.title}

                </p>

                <p
                  className="
                    text-xs
                    text-zinc-400
                    mt-1
                  "
                >

                  {
                    new Date(
                      chat.createdAt
                    ).toLocaleDateString()
                  }

                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>

  );
}