'use client';

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import Image from "next/image";
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area"
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

    const textarea = document.querySelector(".resizable-textarea");
    if (textarea) {
      textarea.style.height = "";
    }

    try {
      const response = await axios.post("/api/civia-question", {
        user_query: input,
      });

      const { chunks, botResponse } = response.data;
      console.log("Chunks", chunks);
      console.log("BotResponse", botResponse);
      // const chunks =  [
      //   [
      //       "Copy of Detailed Instructions Booklet to the Global Investment Guidlines (Investment Team).docx",
      //       "Co-Investment | If the potential investment involves a co-investment, verify the co-investment waterfall and offer the potential investment to applicable co-investors.  | For Sagard-advised co-investors and third-party co-investors:\nRefer to the Supplement of your strategy for the applicable co-investment waterfall. \nEnsure NDA permits sharing confidential information with co-investors and have a joinder agreement signed by the co-investors. \nCo-investment teaser deck must be reviewed by IR and Sagard Legal. \nUndertake commercially reasonable efforts to cause co-investors to bear their proportionate share of any fees, costs, or expenses related to such co-investment opportunity, including Broken Deal Expenses.\nFor third-party co-investors only:\nReview and send out any required notices regarding co-investments.  IR must be consulted before any co-investment notices are sent.  Either: (i) copy IR on emails to investors inviting participation; or (ii) immediately following a phone call with an investor, send a contemporaneous email to IR advising that an investor has been invited to participate in a co-investment.  Emails must be saved in the investment workspace.\nConsider having the co-investor sign an Expression of Interest Letter.",
      //       0.8911100625991821
      //   ],
      //   [
      //       "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
      //       "Co-Investment Rights by LPs under LPA | Sagard Credit Partners I\nSagard Credit Partners I (Cayman) | The GP must secure LPAC approval to encourage LPs or any Affiliate thereof to pursue co-investment opportunities to invest alongside the Partnership or any Parallel Partnership. However – LPAC approval will only be considered if:\ni) The LP or Parallel Investor seeking to co-invest made commitments to the Partnership or any Parallel Partnership either (a) at the Initial closing; (b) or of an amount equal to or exceeding $20 million (a “Qualifying LP”)\nii) The GP has already sought to make co-investment opportunities available to Qualifying LPs by sending written notice of the Opportunity and they seek to offer such excess to any Affiliate of the Manager.\niii) The Co-Investment is controlled and managed by the GP or an Affiliate thereof and will invest in and dispose of their respective investments with the Partnership at the same time and on effectively the same economic terms and conditions in all material respects (after any applicable structural, legal, tax, regulatory and other similar considerations of the Partnership). | 8.3",
      //       0.8869739770889282
      //   ],
      //   [
      //       "Copy of Detailed Instructions Booklet to the Global Investment Guidlines (Investment Team).docx",
      //       "Investment Allocation | Consider if the potential investment can be allocated to another Sagard fund. | Review the Investment Allocation Procedure to determine whether or not the potential investment can be allocated to another Sagard fund.\nIf according to the Investment Allocation Procedure the allocation determination of the potential investment needs to be reviewed by the Investment Allocation Committee, please contact Sagard compliance at Compliance@sagardholdings.com to prepare for the committee. \nSave in the investment workspace the approval from the Investment Allocation Committee. ",
      //       0.8837814927101135
      //   ],
      //   [
      //       "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
      //       "Prohibited Investments without LPAC Approval due to Potential Conflict | Sagard Credit Partners I\nSagard Credit Partners I (Cayman)\nSagard Credit Partners II\nSagard Credit Partners II (Cayman) | LPAC approval is required to invest in securities or affiliates wherein:\ni) A member of the Partnership or any Affiliate thereof owns a direct or indirect ownership interest.\nii) Sagard holds more than 5% of the issued and outstanding equity\niii) The Opportunity is a co-investment alongside any member of the Partnership Group, any fund or vehicle managed by Sagard LP or any of its Subsidiaries (other than the Partnership, any Feeder Vehicle, any Parallel Partnership or any Alternative Investment Vehicle) | 18.4",
      //       0.8793454170227051
      //   ],
      //   [
      //       "Copy of Supplement C to the Global Investment Guidelines (Investment Team).docx",
      //       "Co-Investment  | Contact Sagard Finance at for SCP: scpcoinvest@sagardholdings.com for SSLP: sslpcoinvest@sagardholdings.com, as soon as a co-investment is being contemplated including any Sagard-managed entity and/or LP co-investor. \nFor SCP:\nAll opportunities within SCP’s investment strategy must be allocated to SCP.\nSCP is only permitted to include that portion of a potential investment that SCP determines is not appropriate for the fund to make (i.e. we cannot reduce the Fund’s allocation to make room for co-investors).\nIf SCP would like to offer a co-investment opportunity to any investor (including pursuant to the Canada Life IMA), it must follow the waterfall below:\nTo any $100M+ investors in SCP II and/or any investors that have allocated “significant capital” to the Sagard platform: \nHOOPP ($100M + opportunities), MacKenzie and IMCO.  Please copy IR and Sagard Legal on your outreach email. We must have written records confirming our outreach.\nIf the full amount of the opportunity is not taken up pursuant to #1 above, it can be allocated based on SCP’s discretion (e.g. Canada Life IMA, Wealthsimple Private Credit Fund) provided that SCP has not promised to provide co-investment opportunities to any other investors first.  Please also consult Sagard’s Allocation Policy in the case of Wealthsimple Private Credit Fund for additional steps, including the need for an Investment Allocation Committee meeting to approve the co-investment.\nNote that CSSB, Hewitt, CN, Desjardins, Canada Post, and LMI expressed interest to be shown co-investment opportunities in their side letter.\nFor SSLP:\nIf SSLP determines that an opportunity would be suitable for the Fund and one or more “Qualifying Investors”, SSLP must allocate the investment to such Qualifying Investor(s) according to the Allocation Policy:\n“Qualifying Investor” means:\nCanada Life IMA ($15M investment minimum).\nAny $100M + LPs of SSLP (Canada Life and IMCO)[FN].\nAny $100M + products that are managed, advised or sub-advised by Sagard, or that have a substantially similar investment strategy to SSLP.\nNote: Please copy IR and Sagard Legal on your co-investor outreach email to any Qualifying Investor. We must have written records confirming our outreach.\nFor any portion of the investment not allocated to SSLP or the Qualifying Investors, SSLP may allocate that portion to any potential co-investor at its discretion.\nCurrently, no investors have expressed specific interest to be shown co-investment opportunities in their side letter. \nNote: It is important to document our analysis and rationale when determining to allocate an opportunity to one or more “Qualifying Investors” (e.g. Email records explaining why we are choosing to allocate the opportunity (or a larger portion of the opportunity) to one Qualifying Investor over another).",
      //       0.8792838454246521
      //   ]
      // ];

      // const botResponse = "Test Version. No response yet.";

      if (chunks) {
        setChunks(chunks);
        console.log("Chunks set in Zustand store:", chunks);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "chatbot",
          content: botResponse, 
          // options: [
          //   "Explorer",
          //   "Visualiser les catégories de dépenses les plus importantes"
          // ]
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
        <ScrollArea className="w-full h-full pr-4 scroll-area">
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
        </ScrollArea>
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
      </Card>
    </Rnd>
  );
}
