import { Plus, Minus } from "lucide-react";

// <details> opens/closes by itself, no state needed
export default function Accordion({ title, open = false, children }) {
  return (
    <details open={open} className="group border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 md:px-0 py-4 [&::-webkit-details-marker]:hidden">
        <span className="text-sm uppercase font-light group-open:font-bold">{title}</span>
        <Plus size={24} strokeWidth={1} className="group-open:hidden" />
        <Minus size={24} strokeWidth={1} className="hidden group-open:block" />
      </summary>
      <div className="px-4 md:px-0 pb-6 text-sm">{children}</div>
    </details>
  );
}