import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// Componente principal del Accordion
export function Accordion({ type = "single", collapsible = true, className, children }) {
  return (
    <AccordionPrimitive.Root type={type} collapsible={collapsible} className={className}>
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
export function AccordionTrigger({ children, className }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="flex justify-between w-full p-4 text-left font-medium">
        {children}
        <ChevronDown className="transition-transform duration-200 AccordionChevron" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// Componente del contenido colapsable
export function AccordionContent({ children, className }) {
  return (
    <AccordionPrimitive.Content className={className + "p-4 bg-gray-100 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"}>
      {children}
    </AccordionPrimitive.Content>
  );
}
