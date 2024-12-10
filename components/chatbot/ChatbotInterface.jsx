'use client';

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import Image from "next/image";
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import resizerIcon from "@/public/icons/resize-window.svg"; 
import useChatStore from "@/reducer/chatStore";

const initialMessages = [
  {
    role: "chatbot",
    content: "Quel est ton objectif par rapport à cette analyse? (quelques suggestions ci-dessous)",
    options: [
      "Explorer",
      "Visualiser les catégories de dépenses les plus importantes"
    ]
  },
];

export default function ChatbotInterface({ dimensions = { width: 200, height: 200 } }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const setChunks = useChatStore((state) => state.setChunks);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      // const response = await axios.post("/api/civia-question", {
      //   user_query: input,
      // });

      // const { chunks, reponse } = response.data;

      const chunks = [
          [
              "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
              "Sagard Credit Partners (SCP)",
              0.8383855819702148
          ],
          [
              "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
              "Does the transaction agreement require any non-standard factual representations (e.g. a non-standard ERISA confirmation?)",
              0.8378958702087402
          ],
          [
              "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
              "Investment Restrictions | See SCHEDULE A\nOnly applicable for Sagard Credit Partners\nOnly applicable Sagard Senior Lending\nSee SCHEDULE C - Investment decisions subject to LPAC approval",
              0.8360763788223267
          ],
          [
              "Copy of Detailed Instructions Booklet to the Global Investment Guidlines (Investment Team).docx",
              "Portfolio Company Fees | If fees are to be paid to Sagard in connection with the potential investment, contact Sagard Legal.",
              0.8356555700302124
          ],
          [
              "Copy of Detailed Instructions Booklet to the Global Investment Guidlines (Investment Team).docx",
              "Limited Liability Vehicles Only | Sagard will not invest in entities where the investors have unlimited liability for the debts of the business, such as ordinary partnerships and unlimited companies. Contact Sagard Legal if this cannot be complied with. ",
              0.83512282371521
          ]
      ]

      const botResponse = "Test Version. No response yet.";

      if (chunks) {
        setChunks(chunks);
        console.log("Chunks set in Zustand store:", chunks);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "chatbot",
          content: botResponse, 
          options: [
            "Explorer",
            "Visualiser les catégories de dépenses les plus importantes"
          ]
        },
      ]);
    } catch (error) {
      console.error("Error fetching data from API:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "chatbot",
          content: "Sorry, an error occurred while processing your request. Please try again later.",
        },
      ]);
    }
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: dimensions.width,
        height: dimensions.height,
      }}
      bounds="window"
      minWidth={370} 
      minHeight={375} 
      maxWidth={700}
      maxHeight={785}
      resizeHandleComponent={{
        bottomRight: (
          <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-50">
            <Image
              src={resizerIcon}
              alt="corner-drag"
              width={20}
              height={20}
              className="opacity-30"
            />
          </div>
        ),
      }}
      enableResizing={{
        left: false,
        right: false,
        top: false,
        bottom: false,
        bottomRight: true, 
        bottomLeft: false,
        topRight: false,
        topLeft: false, 
      }}
      lockAspectRatio={false} 
      style={{ cursor: "default" }} 
      onResizeStop={(e, direction, ref) => {
        const width = ref.style.width.replace("px", "");
        const height = ref.style.height.replace("px", "");

        console.log("Resized to:", { width, height });
      }}
    >
      <Card className="flex flex-col w-full h-full relative">
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "chatbot" ? "justify-start" : "justify-end"}`}
            >
              <div className={`flex flex-col max-w-[80%] ${message.role === "chatbot" ? "items-start" : "items-end"}`}>
                <span
                  className={`text-sm font-semibold ${
                    message.role === "chatbot" ? "text-muted-foreground" : "text-primary-foreground"
                  }`}
                >
                  {message.role === "chatbot" ? "Civ.IA" : "Vous"}
                </span>
                <div
                  className={`border rounded-lg border-gray-300 p-3 mt-1 ${
                    message.role === "chatbot"
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); 
                  handleSubmit(e);
                }
              }}
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
