"use client"
import { commandServe } from "@/service/api";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  msg: any;
}

const Chat = () => {
  const [comand, setComand] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null); 

  const handleSumbit = async () => {
    setComand(""); 
    const data = await commandServe({
      text: comand,
    });
    console.log(data);

    setMessages((prev) => [...prev, { id: "user", msg: comand }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: "chatBot", msg: data }]);
    }, 1000);
  };

  useEffect(() => {
      console.log("entered to thsi mesage");
    if (messages) {
        
      messageEndRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,messageEndRef]);

  return (
    <div className="h-[95%]  w-full md:w-[30%] shadow-md rounded-lg flex flex-col">
      <div className="w-full bg-white h-[10vh] flex items-center">
        <img src="/bot.png" className="w-20" alt="" />
        <h3 className="font-mono font-semibold"> Bot Dilu</h3>
      </div>
      <div className="bg-base-200 flex-1 overflow-y-scroll">
        <div className="px-4 py-2">
          {messages.map((msg, index) => (
            <div
              key={index} 
              className={`chat ${msg.id === "user" ? "chat-start" : "chat-end"}`}
            >
              <div
                className={`chat-bubble ${msg.id === "user" ? "bg-gray-400" : "bg-blue-500"}`}
              >
                {typeof msg.msg === "string" ? msg.msg : JSON.stringify(msg.msg)}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <div className="flex items-center">
          <input
            className="w-full border rounded-full py-2 px-4 mr-2"
            type="text"
            placeholder="Type your message..."
            value={comand}
            onChange={(e) => setComand(e.target.value)}
          />
          <button
            onClick={handleSumbit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
