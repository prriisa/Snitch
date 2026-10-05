import React from "react";

const categories = ["All", "Shirts", "Jeans", "Sunglasses", "Sweaters", "Trousers", "T-Shirts", "Shoes", "Jackets", "Perfumes"];

const Trending = () => {
  return (
    <div className="sticky top-[var(--snitch-header-h,74px)] z-30 bg-white flex flex-col items-start gap-3 pt-4">
      <h2 className="px-4 uppercase text-[24px] leading-[26px] md:text-[36px] md:leading-none font-bold">Trending</h2>

      <div className="w-full border-b border-[rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-7 px-3 pt-3 overflow-x-auto no-scrollbar">
          {categories.map((category, index) => (
            <button key={category} type="button" className="relative flex items-center pb-3 shrink-0">
              <span className={`uppercase text-black whitespace-nowrap text-[14px] leading-normal ${index === 0 ? "font-bold" : "font-light"}`}>
                {category}
              </span>
              {index === 0 && <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;