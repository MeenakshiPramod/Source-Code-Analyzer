"use client";

import {
  MessageSquare,
  MessageSquarePlus,
  Trash2,
} from "lucide-react";

import { ChatSession }
from "@/types/chat";

interface SidebarProps {

  chatSessions: ChatSession[];

  currentChatId: string;

  onSelectChat: (
    chat: ChatSession
  ) => void;

  onNewChat: () => void;

  onDeleteChat: (
    id: string
  ) => void;
}

export default function Sidebar({

  chatSessions,

  currentChatId,

  onSelectChat,

  onNewChat,

  onDeleteChat,

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

            <div
              key={chat.id}
              className="
                group
                relative
              "
            >

              {/* CHAT BUTTON */}

              <button

                onClick={() =>
                  onSelectChat(chat)
                }

                className={`
                  w-full
                  p-5
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  text-left

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

                <div className="flex items-start gap-3">

                  <div
                    className="
                      mt-1
                      text-blue-400
                    "
                  >

                    <MessageSquare
                      size={18}
                    />

                  </div>

                  <div
                    className="
                      flex-1
                      min-w-0
                    "
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

                  </div>

                </div>

              </button>

              {/* DELETE BUTTON */}

              <button

                onClick={(e) => {

                  e.stopPropagation();

                  onDeleteChat(
                    chat.id
                  );
                }}

                className="
                  absolute
                  top-4
                  right-4
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                  p-2
                  rounded-lg
                  bg-red-500/10
                  hover:bg-red-500/20
                  text-red-400
                "
              >

                <Trash2 size={16} />

              </button>

            </div>

          )
        )}

      </div>

    </aside>
  );
}