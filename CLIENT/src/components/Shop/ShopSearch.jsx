import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const searchTexts = [
  'Search "POLO SHIRTS"',
  'Search "LINEN SHIRTS"',
  'Search "WHITE SHIRTS"',
  'Search "POLO T-SHIRTS"',
  'Search "BLACK SHIRTS"',
  'Search "STRAIGHT FIT JEANS"',
  'Search "FORMAL SHIRT"',
  'Search "CLUB WEAR"',
  'Search "BAGGY JEANS"',
  'Search "CHECK SHIRTS"',
];

const ShopSearch = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % searchTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-[9999] bg-white md:hidden">
      <div className="w-[98%] mx-auto py-[15px]">
        <div className="flex items-center mt-2 relative w-full">
          <div className="relative flex items-center h-[40px] mx-[16px] border border-black flex-1 cursor-pointer">
            <Search size={28} strokeWidth={1.25} className="ml-2 shrink-0" />

            <input
              type="text"
              readOnly
              className="flex flex-1 h-full w-full bg-transparent focus:outline-none px-3"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center px-5 ml-5">
              <div className="relative w-full h-7 overflow-hidden">
                <div
                  className="absolute left-0 top-0 w-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateY(-${index * 28}px)`,
                  }}
                >
                  {searchTexts.map((text, i) => (
                    <div
                      key={i}
                      className="h-7 flex items-center px-1 text-black text-[12px] leading-[17px]"
                      style={{
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSearch;