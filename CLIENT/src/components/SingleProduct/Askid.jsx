import { Search, Send } from "lucide-react";

const chips = [
  ["About this product", "What material is this", "What fit is this", "Similar styles & patterns", "Fabric feel"],
  ["Different fit, same color", "Bottoms to pair with this", "Accessories to pair", "Footwear to match this style", "How to style this look"],
];

export default function AskSid() {
  return (
    <div className="mx-4 md:mx-0 overflow-hidden rounded-[10px] bg-[#424242] text-white">
      <div className="flex items-center gap-3 bg-gradient-to-r from-black to-transparent px-4 py-2">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#E6734D] bg-black text-[#E6734D]">✦</span>
        <div>
          <h3 className="text-sm font-bold">ASK SID</h3>
          <p className="text-sm text-gray-300">Your AI-powered style assistant</p>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto px-3 [scrollbar-width:none]">
        <div className="flex w-max flex-col gap-2.5">
          {chips.map((row, i) => (
            <div key={i} className="flex gap-3">
              {row.map((t) => (
                <button key={t} className="whitespace-nowrap rounded-[10px_10px_10px_0] bg-[#686868] px-4 py-1.5 text-sm font-light">{t}</button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="m-3 flex items-center gap-2 rounded-lg bg-[#EEE] px-4 py-1 text-gray-700">
        <Search size={15} />
        <input placeholder="What goes with this" className="flex-1 bg-transparent text-sm outline-none" />
        <Send size={18} className="opacity-40" />
      </div>
    </div>
  );
}