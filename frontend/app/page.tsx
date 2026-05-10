import Sidebar from "@/components/Sidebar";
import ChatSection from "@/components/ChatSection";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <ChatSection />
    </main>
  );
}