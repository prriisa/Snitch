import { Ruler } from "lucide-react";

export default function SizeSelector({ sizes }) {
  return (
    <div className="mx-4 md:mx-0 my-3">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-light">
          <Ruler size={18} className="text-[#E16E50]" /> We recommend one size smaller
        </span>
        <button className="uppercase underline">Size Guide</button>
      </div>

      <div className="flex">
        {sizes.map((s) => (
          <button key={s} className="h-11 min-w-12 border border-neutral-300 px-3 text-sm -ml-px first:ml-0 hover:bg-gray-50">
            {s}
          </button>
        ))}
      </div>

      <p className="mt-4 bg-[#F4EEEE] py-2 text-center text-xs md:text-sm">
        FREE 1-2 day delivery on 5k+ pincodes
      </p>
    </div>
  );
}