import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import Image from "next/image";
import { Send, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import resizerIcon from "@/public/icons/resize-window.svg";
import useChatStore from "@/reducer/chatStore";
import useNavStore from "@/reducer/navStore";

const initialMessages = [
  {
    role: "chatbot",
    content: "Quel est ton objectif par rapport à cette analyse? (quelques suggestions ci-dessous)",
    options: ["Explorer", "Visualiser les catégories de dépenses les plus importantes"],
  },
];

export default function ChatbotInterface({ dimensions = { width: 200, height: 200 } }) {
  const { toggleChatbotVisibility } = useNavStore();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const messagesEndRef = useRef(null);
  const [componentSize, setComponentSize] = useState({
    width: dimensions.width,
    height: dimensions.height
  });

  const setChunks = useChatStore((state) => state.setChunks);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    toggleChatbotVisibility();
  };

  const handleMinimize = () => {
    setIsCollapsed((prev) => !prev); 
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
      const response = await axios.post("/api/civia-question", { user_query: input });

      const { chunks, botResponse } = response.data;
      if (chunks) setChunks(chunks);

      setMessages((prev) => [...prev, { role: "chatbot", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching data from API:", error);

      setMessages((prev) => [
        ...prev,
        { role: "chatbot", content: "Sorry, an error occurred while processing your request." },
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
      size={{
        width: componentSize.width,
        height: isCollapsed ? 100 : componentSize.height,
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setComponentSize({
          width: ref.style.width,
          height: ref.style.height
        });
      }}
      bounds="window"
      minWidth={370}
      minHeight={isCollapsed ? 100 : 200} 
      maxWidth={700}
      maxHeight={isCollapsed ? 100 : 785} 
      resizeHandleStyles={{ bottomRight: { right: "1px", bottom: "1px" } }}
      resizeHandleComponent={{
        bottomRight: (
          <div className="absolute bottom-1.5 right-1.5 pointer-events-none z-50">
            <Image
              src={resizerIcon}
              alt="corner-drag"
              width={20}
              height={20}
              className="opacity-100"
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
    >
      <Card
        className={`flex flex-col w-full relative transition-all duration-500 ease-in-out ${
          isCollapsed ? "h-[100px] overflow-hidden" : "h-full"
        }`}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Chatbot</CardTitle>
          <div className="flex space-x-2">
            {/* Minimize Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-emerald-50 border"
              onClick={handleMinimize}
            >
              <Minus className="h-5 w-5 text-gray-500" />
            </Button>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-emerald-50 border"
              onClick={handleClose}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        {!isCollapsed && (
          <ScrollArea className="w-full h-full pr-4 scroll-area transition-all duration-500 ease-in-out">
            <CardContent className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "chatbot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex flex-col max-w-[80%] ${
                      message.role === "chatbot" ? "items-start" : "items-end"
                    }`}
                  >
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
          </ScrollArea>
        )}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-h-[60px] resizable-textarea"
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
        )}
      </Card>
    </Rnd>
  );
}
