import {
  Sparkles,
  BrainCircuit,
} from "lucide-react";

export default function EmptyState() {

  return (

    <div
        className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-8
            py-16
            max-w-6xl
            mx-auto
        "
        >

      {/* ICON */}

      <div
        className="
            w-24
            h-24
            rounded-3xl
            bg-gradient-to-br
            from-blue-500/20
            to-purple-500/20
            border
            border-white/10
            flex
            items-center
            justify-center
            mb-8
        "
        >

        <Sparkles
          size={40}
          className="
            text-blue-400
          "
        />

      </div>

      {/* TITLE */}

      <h1
        className="
          text-4xl md:text-6xl
          font-bold
          text-white
          mb-4
        "
      >

        AI Repository
        Assistant

      </h1>

      {/* DESCRIPTION */}

      <p
        className="
          text-zinc-400
          text-lg
          max-w-2xl
          leading-relaxed
          mb-14
        "
      >

        Analyze GitHub repositories
        using RAG, ChromaDB,
        Groq AI, semantic search,
        and conversational code
        understanding.

      </p>

      {/* FEATURES */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-5
          w-full
          max-w-4xl
        "
      >

        {/* CARD 1 */}

        <div
          className="
            p-6
            rounded-3xl
            bg-white/5
            border
            border-white/10
          "
        >

          <Sparkles
            className="
              text-blue-400
              mb-4
            "
            size={28}
          />

          <h3
            className="
              text-white
              font-semibold
              mb-2
            "
          >

            Repository Analysis

          </h3>

          <p
            className="
              text-zinc-400
              text-sm
            "
          >

            Analyze GitHub repositories
            instantly with AI.

          </p>

        </div>

        {/* CARD 2 */}

        <div
          className="
            p-6
            rounded-3xl
            bg-white/5
            border
            border-white/10
          "
        >

          <BrainCircuit
            className="
              text-purple-400
              mb-4
            "
            size={28}
          />

          <h3
            className="
              text-white
              font-semibold
              mb-2
            "
          >

            AI-Powered Q&A

          </h3>

          <p
            className="
              text-zinc-400
              text-sm
            "
          >

            Ask architecture and
            codebase questions using
            RAG retrieval.

          </p>

        </div>

        {/* CARD 3 */}

        <div
          className="
            p-6
            rounded-3xl
            bg-white/5
            border
            border-white/10
          "
        >

          <Sparkles
            className="
              text-pink-400
              mb-4
            "
            size={28}
          />

          <h3
            className="
              text-white
              font-semibold
              mb-2
            "
          >

            Smart AI Responses

          </h3>

          <p
            className="
              text-zinc-400
              text-sm
            "
          >

            Streaming AI answers with
            markdown rendering and
            source references.

          </p>

        </div>

      </div>

    </div>

  );
}