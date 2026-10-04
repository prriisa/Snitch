import React from "react";

const categories = [
  { name: "ALL", bold: true },
  { name: "SHOP ALL" },
  { name: "Bestsellers" },
  { name: "OUTERWEAR" },
  { name: "Shirts" },
  { name: "T-Shirts | POLO" },
  { name: "Jeans" },
  { name: "Trousers" },
  { name: "Footwear" },
  { name: "Cargo pants" },
  { name: "Joggers" },
  { name: "SHORTS" },
  { name: "Overshirts" },
  { name: "Luggage" },
  { name: "PERFUMES", badge: "FLAT 50% OFF" },
  { name: "ACCESSORIES" },
  { name: "BAGS" },
  { name: "Belts" },
  { name: "SUNGLASSES", badge: "AT ₹ 999" },
  { name: "LINEN EDIT" },
  { name: "BASICS | CORE LAB" },
  { name: "Last Chance", red: true },
  { name: "SNITCH PLUS", badge: "3XL - 6XL" },
  { name: "SNITCH LUXE", badge: "PREMIUM" },
  { name: "Celeb Collabs" },
  { name: "PRICE DROP", red: true },
];

const ShopCategories = () => {
  return (
    <div className="flex items-start max-w-[1440px] mx-auto pt-0">
      <nav className="grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-x-20 gap-y-0 md:gap-y-6 shrink-0 pt-0 md:pt-[8px] w-full md:w-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className="bg-transparent p-0 border-0 flex items-center text-left px-4 py-3 md:px-0 md:py-0 hover:bg-gray-50 md:hover:bg-transparent"
          >
            <span
              className={`uppercase text-[14px] md:text-[16px] leading-normal ${
                category.bold ? "font-bold" : "font-normal"
              } ${category.red ? "text-[#9C000B]" : "text-black"}`}
            >
              {category.name}
            </span>

            {category.badge && (
              <span className="ml-2 bg-[#8F1717] px-1.5 py-1 text-[8px] md:text-[10px] leading-none text-white uppercase font-bold">
                {category.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ShopCategories;