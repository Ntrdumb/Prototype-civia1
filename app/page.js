"use client";

import { useState, useRef } from "react";
import useNavStore from "@/reducer/navStore";
import { BottomNav } from "@/components/nav/BottomNav";
import Chatbot from "@/components/chatbot/Chatbot";
import ChatbotInterface from "@/components/chatbot/ChatbotInterface";
import Wrapper from "@/components/misc/Wrapper";
import DraggableWrapper from "@/components/misc/DraggableWrapper";
import TestsDiv from "@/components/misc/TestsDiv";
import DraggableTestsDiv from "@/components/misc/DraggableTestsDiv";
import { DndContext } from "@dnd-kit/core";
import FinancialChart from "@/components/misc/FinancialChart";
import Filters from "@/components/misc/Filters";
import Visualisations from "@/components/misc/Visualisations";
import UploadBox from "@/components/uploader/UploadBox";

export default function Home() {
  const { chatbotVisibility, toggleChatbotVisibility,
    chartVisibility, toggleChartVisibility,
    filtersVisibility, toggleFiltersVisibility, 
    uploadVisibility, toggleUploadVisibility,
   } = useNavStore();
  
  return (
    <div className="h-screen gradient-anim overflow-hidden">
        <div className="fixed top-0 left-0 bg-white w-full py-2">
          <img
            src="/sagard_logo.png"
            alt="Sagard Logo"
            className="h-12 w-auto"
          />
        </div>

        <main className="relative content-center h-full w-full overflow-hidden">

          {filtersVisibility && (
              <Filters />
          )}

          {chatbotVisibility && (
              <ChatbotInterface dimensions={{ width: 400, height: 500 }} />
          )}

          {chartVisibility && (
            // <FinancialChart dimensions={{ width: 200, height: 600 }} />
            <Visualisations dimensions={{ width: 700, height: 500 }} />
          )}

          {uploadVisibility && (
            <UploadBox dimensions={{ width: 1000, height: 580 }}/>
          )}

          <BottomNav
            onItemClick={(item) => {
              if (item === "Chat") {
                toggleChatbotVisibility();
              }
              else if (item === "Visualisations") {
                toggleChartVisibility();
              }
              else if (item === "Filters") {
                toggleFiltersVisibility();
              }
              else if (item === "Upload") {
                toggleUploadVisibility();
              }
              console.log(`Clicked ${item}`);
            }}
          />
        </main>
    </div>
  );
}
