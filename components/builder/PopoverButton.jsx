import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const PopoverButton = ({ onInteraction = "click", title, content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (onInteraction === "hover") setIsOpen(true);
  };

  const handleClose = () => {
    if (onInteraction === "hover") setIsOpen(false);
  };

  return (
    <Popover open={onInteraction === "hover" ? isOpen : undefined} onOpenChange={setIsOpen}>
      <div
        onMouseEnter={onInteraction === "hover" ? handleOpen : undefined}
        onMouseLeave={onInteraction === "hover" ? handleClose : undefined}
      >
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 p-4 space-y-2">
          {title && <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>}
          {content}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default PopoverButton;
