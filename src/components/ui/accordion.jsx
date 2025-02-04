import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

// Componente principal del Accordion
export function Accordion({ type = "single", collapsible = true, className, children }) {
  return (
    <AccordionPrimitive.Root
      type={type}
      collapsible={collapsible}
      className={clsx("w-full", className)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

// Componente de cada ítem del Accordion
export function AccordionItem({ value, children }) {
  return (
    <AccordionPrimitive.Item value={String(value)} className="border-b">
      {children}
    </AccordionPrimitive.Item>
  );
}

// Componente del botón que expande el contenido
export function AccordionTrigger({ children }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="group flex rounded bg-slate-300 justify-between items-center w-full p-4 text-left font-medium transition-all duration-300 hover:cursor-pointer hover:bg-slate-200">
        {children}
        <ChevronDown
          className="h-5 w-5 transition-all duration-200 AccordionChevron group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// Componente del contenido colapsable
export function AccordionContent({ children }) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
    >
      <div className="p-4 bg-gray-100">{children}</div>
    </AccordionPrimitive.Content>
  );
}
