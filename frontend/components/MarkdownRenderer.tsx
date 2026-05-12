"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {

  // Cleanup weird formatting if model outputs it
  const cleanedContent = content
    .replace(/\/\*/g, "")
    .replace(/\*\//g, "");

  return (

    <div className="max-w-none text-zinc-100 leading-relaxed">

      <ReactMarkdown remarkPlugins={[remarkGfm]}>

        {cleanedContent}

      </ReactMarkdown>

    </div>
  );
}