import { Star, Copy } from "lucide-react";

export default function ProductHeader({ p }) {
  return (
    <div className="my-4">
      <div className="mx-4 md:mx-0">
        <h1 className="text-sm md:text-base font-light">{p.title}</h1>
        <p className="mt-1 text-sm md:text-lg font-bold">₹{p.price}</p>
        <p className="text-xs font-light text-black/60">*MRP Inclusive of all taxes</p>

        <div className="my-3 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-0.5 bg-black pl-1 pr-0.5 text-xs font-bold text-white">
            {p.rating} <Star size={12} fill="currentColor" />
          </span>
          <span><b>{p.ratings}</b> Ratings and <b>{p.reviews}</b> Reviews</span>
        </div>
      </div>

      {/* offer cards */}
      <div className="flex gap-2.5 overflow-x-auto pl-4 md:pl-0 [scrollbar-width:none]">
        {p.offers.map(([code, text]) => (
          <div key={code} className="min-w-[260px] bg-[#F4EEEE] p-3">
            <span className="inline-flex items-center gap-1 rounded-sm bg-[#F5A593] px-1.5 py-1 text-[10px]">
              {code} <Copy size={12} />
            </span>
            <p className="mt-1.5 text-xs font-light">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}