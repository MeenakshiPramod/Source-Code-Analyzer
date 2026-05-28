import ChatSection from "@/components/ChatSection";

export default function Home() {

  return (

    <main
      className="
        flex
        flex-col
        lg:flex-row
        min-h-screen
        overflow-hidden
      "
    >

      <ChatSection />

    </main>

  );
}