export default function TypingIndicator() {

  return (

    <div
      className="
        flex
        items-center
        gap-2
        px-5
        py-4
        rounded-2xl
        bg-white/5
        border
        border-white/10
        w-fit
      "
    >

      <div
        className="
          w-2
          h-2
          rounded-full
          bg-blue-400
          animate-bounce
        "
      />

      <div
        className="
          w-2
          h-2
          rounded-full
          bg-purple-400
          animate-bounce
          delay-150
        "
      />

      <div
        className="
          w-2
          h-2
          rounded-full
          bg-pink-400
          animate-bounce
          delay-300
        "
      />

    </div>

  );
}