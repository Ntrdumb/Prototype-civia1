import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import Image from "next/image";
import { Send, X, Minus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import resizerIcon from "@/public/icons/resize-window.svg";
import useChatStore from "@/reducer/chatStore";
import useNavStore from "@/reducer/navStore";

const initialMessages = [
  {
    role: "chatbot",
    content: "What is your goal with this analysis? (some suggestions below)",
    options: ["Explore", "View the biggest spending categories"],
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [typing, setTyping] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [feedbackInput, setFeedbackInput] = useState(""); // State for worded feedback
  const [submittedFeedback, setSubmittedFeedback] = useState({});

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

  useEffect(() => {
    const xPosition = window.innerWidth / 4;
    const yPosition = window.innerWidth / 12;
    setPosition({ x: xPosition, y: yPosition });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setTyping(true);

    try {
      const response = await axios.post("/api/civia-question", { user_query: input });

      let { chunks, botResponse } = response.data;
      if (botResponse === "The answer is not available in the provided documentation.") {
        botResponse = "I am unable to provide an exact responsable to your query. Please refer to the Sources panel for more information. If your question remains unanswered, kindly reach out to Sagard Legal for assistance.";
      }
      if (chunks) setChunks(chunks);

      setMessages((prev) => [...prev, { role: "chatbot", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching data from API:", error);

      setMessages((prev) => [
        ...prev,
        { role: "chatbot", content: "Sorry, an error occurred while processing your request." },
      ]);
    } finally {
      setTyping(false); 
    }
  };

  const handleFeedback = (index) => {
    setFeedback((prev) => ({ ...prev, [index]: true }));
  };
  
  const handleSubmitFeedback = (index) => {
    setSubmittedFeedback((prev) => ({ ...prev, [index]: feedbackInput }));
    setFeedbackInput("");
  };

  return (
    <Rnd
      position={position}
      // default={{
      //   // x: window.innerWidth / 3, // Was 0
      //   // y: window.innerHeight / 2 - dimensions.height / 2, // Was 0
      //   width: dimensions.width,
      //   height: dimensions.height,
      // }}
      size={{
        width: componentSize.width,
        height: isCollapsed ? 100 : componentSize.height,
      }}
      dragHandleClassName="draggable"
      onResizeStop={(e, direction, ref, delta, position) => {
        setComponentSize({
          // width: ref.style.width,
          // height: ref.style.height
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
      onDragStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      bounds="window"
      minWidth={370}
      minHeight={isCollapsed ? 100 : 250} 
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
        <CardHeader className="flex flex-row justify-between items-center draggable">
          <CardTitle className="text-xl">Ask your questions</CardTitle>
          <div className="flex space-x-2">
            {/* Minimize Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary3 border"
              onClick={handleMinimize}
            >
              <Minus className="h-5 w-5 text-gray-500" />
            </Button>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary3 border"
              onClick={handleClose}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        {!isCollapsed && (
          <ScrollArea className="w-full h-full pr-4 scroll-area transition-all duration-500 ease-in-out">
            <CardContent className="flex-1 overflow-auto p-4 space-y-4 text-primary1">
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
                      {message.role === "chatbot" ? "Civ.IA" : "You"}
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
                    {/* This is if u want a submit a feedback and like */}
                    {/* {message.role === "chatbot" && index > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            onClick={() => handleFeedback(index)}
                            className="flex items-center mt-1 text-xs text-gray-500 hover:text-green-500 transition-all duration-200"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span className="text-xs">Thumbs Up</span>
                          </button>
                        </PopoverTrigger>
                        {!submittedFeedback[index] && (
                          <PopoverContent className="w-64 p-4 space-y-2">
                            <h4 className="text-sm font-semibold">Leave feedback</h4>
                            <Textarea
                              placeholder="What did you like or want to share?"
                              value={feedbackInput}
                              onChange={(e) => setFeedbackInput(e.target.value)}
                              className="h-24"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSubmitFeedback(index)}
                              disabled={!feedbackInput.trim()}
                            >
                              Submit
                            </Button>
                          </PopoverContent>
                        )}
                        {submittedFeedback[index] && (
                          <div className="mt-1 text-green-500 text-xs">
                            Thank you for the feedback!
                          </div>
                        )}
                      </Popover>
                    )} */}
                    
                    {/*  This is if u want an instant like button */}
                    {message.role === "chatbot" && index > 0 && !feedback[index] && (
                      <button
                        onClick={() => handleFeedback(index)}
                        className="flex items-center mt-1 text-xs text-gray-500 hover:text-green-500 transition-all duration-200"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" /> 
                        <span className="text-xs">Thumbs Up</span>
                      </button>
                    )}
                    {message.role === "chatbot" && index > 0 && feedback[index] && (
                      <div className="mt-1 text-green-500 text-xs flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" /> Thank you for the feedback!
                      </div>
                    )}
                    {message.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.options.map((option, i) => (
                          <Button
                            className="text-primary1"
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
              {/* Typing Indicator (3 dots) */}
              {typing && (
                <div className="flex justify-start">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              )}
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
