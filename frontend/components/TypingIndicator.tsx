export default function TypingIndicator() {
  return (

    <div className="flex items-center gap-2 px-4 py-3">

      <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />

      <div
        className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />

      <div
        className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
        style={{ animationDelay: "0.4s" }}
      />

    </div>
  );
}