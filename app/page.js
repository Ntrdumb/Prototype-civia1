"use client";

import { useState, useRef } from "react";
import useNavStore from "@/store/navStore";
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

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { chatbotVisibility, toggleChatbotVisibility } = useNavStore();
  const { chartVisibility, toggleChartVisibility } = useNavStore();
  const { filtersVisibility, toggleFiltersVisibility } = useNavStore();
  const chatbotRef = useRef(null); 

  const handleDragEnd = (event) => {
    if (!event.delta) return;

    // Calculate and update the position
    setPosition((prev) => ({
      x: prev.x + event.delta.x,
      y: prev.y + event.delta.y,
    }));
    console.log("Drag ended. New position:", position);
  };
  
  return (
    // <DndContext onDragEnd={handleDragEnd}>
      // <div className="h-screen gradient-anim">
      //     <main className="relative content-center h-full w-full">
      //       {/* <Wrapper title="Chatbot"> */}
      //         {/* <Chatbot /> */}
      //       {/* </Wrapper> */}
      //       {chatbotVisibility && (
      //         <TestsDiv position={position} onDragEnd={handleDragEnd} />
      //       )}
      //       <BottomNav
      //         onItemClick={(item) => {
      //           if (item === "Chat") {
      //             toggleChatbotVisibility();
      //           }
      //           console.log(`Clicked ${item}`);
      //         }}
      //       />
      //     </main>
      // </div>
    // </DndContext>

    <div className="h-screen gradient-anim">
        <main className="relative content-center h-full w-full">
          {chatbotVisibility && (
              <ChatbotInterface />
          )}

          {chartVisibility && (
            <FinancialChart />
          )}
          
          {filtersVisibility && (
            <Filters />
          )}
          <BottomNav
            onItemClick={(item) => {
              if (item === "Chat") {
                toggleChatbotVisibility();
              }
              else if (item === "Visualisations") {
                toggleChartVisibility();
              }
              else if (item === "Filtres") {
                toggleFiltersVisibility();
              }
              console.log(`Clicked ${item}`);
            }}
          />
        </main>
    </div>
  );
}
