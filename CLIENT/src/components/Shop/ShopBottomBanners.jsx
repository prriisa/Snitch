import React from "react";

const banners = [
  {
    alt: "GIFT CARDS",
    image:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-bottom-banners/9ac0f6d1-2d30-4761-850d-208bc63138f9/1788350127.gif",
  },
  {
    alt: "STORE NEAR YOU",
    image:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-bottom-banners/89c18f2b-9263-434b-97a1-d15eb6d1110d/1788765358.gif",
  },
  {
    alt: "Snitch Squad",
    image:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-bottom-banners/5d2efffe-c039-4c4a-a46f-e19059675382/1789018083.gif",
  },
];

const ShopBottomBanners = () => {
  return (
    <div className="flex overflow-x-auto no-scrollbar py-[40px] px-4 md:px-0">
      {banners.map((banner) => (
        <button
          key={banner.alt}
          type="button"
          className="flex-shrink-0 mr-3 cursor-pointer bg-transparent p-0 border-0"
        >
          <img
            src={banner.image}
            alt={banner.alt}
            width={270}
            height={100}
            loading="lazy"
            className="block w-[270px] h-[100px] object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default ShopBottomBanners;
