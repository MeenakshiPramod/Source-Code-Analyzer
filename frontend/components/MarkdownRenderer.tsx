"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {

  // Cleanup weird formatting
  const cleanedContent = content
    .replace(/\/\*/g, "")
    .replace(/\*\//g, "");

  return (

    <div className="max-w-none text-zinc-100 leading-relaxed">

      <ReactMarkdown

        remarkPlugins={[remarkGfm]}

        components={{

          code(props) {

            const { children, className } = props;

            const match = /language-(\w+)/.exec(
              className || ""
            );

            // Code Block
            if (match) {

              return (

                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >

                  {String(children).replace(/\n$/, "")}

                </SyntaxHighlighter>

              );
            }

            // Inline Code
            return (

              <code className="bg-zinc-800 px-1 py-0.5 rounded text-blue-400">

                {children}

              </code>

            );
          },

        }}

      >

        {cleanedContent}

      </ReactMarkdown>

    </div>
  );
}