'use client';

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import resizerIcon from "@/public/icons/resize-window.svg"; 

const initialMessages = [
  {
    role: "assistant",
    content: "Quel est ton objectif par rapport à cette analyse? (quelques suggestions ci-dessous)",
    options: [
      "Explorer",
      "Visualiser les catégories de dépenses les plus importantes"
    ]
  },
];

export default function ChatbotInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I understand you're interested in financial analysis. Let me help you with that. What specific aspects would you like to explore?",
        options: ["View Forecasts", "Analyze Expenses", "Generate Report"]
      }]);
    }, 1000);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 400,
        height: 500,
      }}
      bounds="window"
      minWidth={300} 
      minHeight={300} 
      resizeHandleStyles={{
        bottomRight: { pointerEvents: "auto" }, 
      }}
      resizeHandleComponent={{
        bottomRight: (
          <div className="opacity-30 absolute bottom-1.5 right-1.5 pointer-events-none z-50">
            <Image
              src={resizerIcon}
              alt="corner-drag"
              width={20}
              height={20}
              className="pointer-events-none"
            />
          </div>
        ),
      }}
      enableResizing={{
        bottomRight: true, 
      }}
      lockAspectRatio={false} 
      onResizeStop={(e, direction, ref) => {
        const width = ref.style.width.replace("px", "");
        const height = ref.style.height.replace("px", "");

        console.log("Resized to:", { width, height });
      }}
    >
      <Card className="flex flex-col w-full h-full relative">
        {/* <CardHeader className="cursor-move">
          <CardTitle>Chatbot</CardTitle>
        </CardHeader> */}
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div className={`flex flex-col max-w-[80%] ${message.role === "assistant" ? "items-start" : "items-end"}`}>
                <span
                  className={`text-sm font-semibold ${
                    message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground"
                  }`}
                >
                  {message.role === "assistant" ? "Civ.IA" : "Vous"}
                </span>
                <div
                  className={`border rounded-lg border-gray-300 p-3 mt-1 ${
                    message.role === "assistant"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.options.map((option, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setInput(option);
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px]"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </Rnd>
  );
}
