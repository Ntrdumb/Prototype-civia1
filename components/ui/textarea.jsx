import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const textareaRef = React.useRef(null);

  const handleInput = () => {
    const element = textareaRef.current;
    if (element) {
      // Reset height to calculate the new height
      element.style.height = "auto";
      element.style.height = `${Math.min(element.scrollHeight, 200)}px`; // Adjust 200px to your desired max height
    }
  };

  return (
    <textarea
      ref={(node) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      onInput={handleInput}
      className={cn(
        "flex w-full resize-none overflow-auto rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
        className
      )}
      {...props}
      style={{
        maxHeight: "200px", // Maximum height
        overflowY: "auto", // Scrollbar appears when max height is reached
      }}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
