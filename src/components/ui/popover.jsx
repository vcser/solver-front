"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../../lib/utils.js";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef((
  { className, align = "center", sideOffset = 4, children, ...props },
  ref,
) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-lg rounded-md bg-slate-100/30 backdrop-blur-md p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
      <PopoverPrimitive.Close
        className="absolute z-1000 cursor-pointer right-[5px] top-[5px] bg-slate-100 inline-flex size-[25px] items-center justify-center rounded-md text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        aria-label="Close"
      >
        X
      </PopoverPrimitive.Close>
      <PopoverPrimitive.Arrow className="fill-slate-100/30 backdrop-blur-md" />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
