import React, { useState } from "react";

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold">Chat Support</h2>
      <div className="h-40 overflow-y-auto bg-white p-2 rounded">
        {messages.map((msg, index) => (
          <p key={index} className="text-sm">{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 rounded w-full"
      />
      <button onClick={sendMessage} className="bg-teal-500 text-white p-1 rounded">
        Send
      </button>
    </div>
  );
};

export default ChatSupport;
