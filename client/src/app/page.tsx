import Chat from "@/components/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-[90%] md:w[60%] mx-auto items-center h-screen flex justify-center" >
      <Chat />
    </main>
  );
}
