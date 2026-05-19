"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy, Check }
from "lucide-react";

interface Props {
  content: string;
}

function CopyButton({
  text,
}: {
  text: string;
}) {

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

      console.error(
        "Failed to copy:",
        error
      );
    }
  };

  return (

    <button
      onClick={handleCopy}
      className="
        absolute
        top-3
        right-3
        flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-lg
        bg-white/10
        hover:bg-white/20
        text-xs
        text-zinc-300
        transition-all
        backdrop-blur-md
        border
        border-white/10
      "
    >

      {copied ? (
        <>
          <Check size={14} />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} />
          Copy
        </>
      )}

    </button>
  );
}

export default function MarkdownRenderer({
  content,
}: Props) {

  // Cleanup weird formatting
  const cleanedContent = content
    .replace(/\/\*/g, "")
    .replace(/\*\//g, "");

  return (

    <div
      className="
        max-w-none
        text-zinc-100
        leading-relaxed
      "
    >

      <ReactMarkdown

        remarkPlugins={[remarkGfm]}

        components={{

          code({
            inline,
            className,
            children,
            ...props
          }: any) {

            const match =
              /language-(\w+)/.exec(
                className || ""
              );

            const codeString =
              String(children).replace(
                /\n$/,
                ""
              );

            // Code Blocks
            if (!inline && match) {

              return (

                <div className="relative my-4">

                  <CopyButton
                    text={codeString}
                  />

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="
                      rounded-2xl
                      !bg-[#111827]
                      border
                      border-white/10
                      text-sm
                    "
                    customStyle={{
                      padding:
                        "1.5rem",
                      borderRadius:
                        "1rem",
                    }}
                    {...props}
                  >

                    {codeString}

                  </SyntaxHighlighter>

                </div>

              );
            }

            // Inline Code
            return (

              <code
                className="
                  bg-zinc-800
                  px-1.5
                  py-0.5
                  rounded
                  text-blue-400
                  text-sm
                "
                {...props}
              >

                {children}

              </code>

            );
          },

          h1({ children }) {

            return (
              <h1
                className="
                  text-3xl
                  font-bold
                  mt-6
                  mb-4
                  text-white
                "
              >
                {children}
              </h1>
            );
          },

          h2({ children }) {

            return (
              <h2
                className="
                  text-2xl
                  font-semibold
                  mt-5
                  mb-3
                  text-white
                "
              >
                {children}
              </h2>
            );
          },

          h3({ children }) {

            return (
              <h3
                className="
                  text-xl
                  font-semibold
                  mt-4
                  mb-2
                  text-white
                "
              >
                {children}
              </h3>
            );
          },

          p({ children }) {

            return (
              <p
                className="
                  mb-4
                  text-zinc-200
                "
              >
                {children}
              </p>
            );
          },

          ul({ children }) {

            return (
              <ul
                className="
                  list-disc
                  pl-6
                  mb-4
                  space-y-2
                "
              >
                {children}
              </ul>
            );
          },

          ol({ children }) {

            return (
              <ol
                className="
                  list-decimal
                  pl-6
                  mb-4
                  space-y-2
                "
              >
                {children}
              </ol>
            );
          },

          li({ children }) {

            return (
              <li
                className="
                  text-zinc-200
                "
              >
                {children}
              </li>
            );
          },

          blockquote({ children }) {

            return (
              <blockquote
                className="
                  border-l-4
                  border-blue-500
                  pl-4
                  italic
                  text-zinc-400
                  my-4
                "
              >
                {children}
              </blockquote>
            );
          },

        }}

      >

        {cleanedContent}

      </ReactMarkdown>

    </div>
  );
}