import React from "react";

const banners = [
  {
    alt: "NEW ARRIVALS",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/3d70fedf-e4c5-43df-94f6-33515ad7b9fd/1787215478_mobile.png?w=90",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/3d70fedf-e4c5-43df-94f6-33515ad7b9fd/1787215478_desktop.png",
  },
  {
    alt: "Snitch X Siraj",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/0c991d42-cec3-4fe9-b1f5-884cbeacb98e/1787215358_mobile.png?w=90",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/0c991d42-cec3-4fe9-b1f5-884cbeacb98e/1789018321_desktop.png",
  },
  {
    alt: "GRIND",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/72f132a7-3ebb-4860-a7cb-cdc7f8b8784a/1787215381_mobile.png?w=90",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/72f132a7-3ebb-4860-a7cb-cdc7f8b8784a/1787215381_desktop.png",
  },
  {
    alt: "STRYKER SHOES",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/1a860d43-fddf-42b4-8e02-86912e269fee/1790316324_mobile.jpeg?w=90",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/1a860d43-fddf-42b4-8e02-86912e269fee/1790316324_desktop.jpeg",
  },
  {
    alt: "Loved By Everyone Jeans",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/4f03cfd2-deb5-44f5-a521-c2d6213b8274/1790316284_mobile.jpeg?w=90",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/4f03cfd2-deb5-44f5-a521-c2d6213b8274/1790316284_desktop.jpeg",
  },
];

const ShopTopBanners = () => {
  return (
    <>
      <div className="md:hidden px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex">
          {banners.map((banner) => (
            <button
              key={banner.alt}
              type="button"
              className="flex-shrink-0 mr-3 cursor-pointer bg-transparent p-0 border-0"
            >
              <img
                src={banner.mobile}
                alt={banner.alt}
                width={100}
                height={100}
                loading="lazy"
                className="block w-[100px] h-[100px] object-cover"
              />
            </button>
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>

      <div className="hidden md:mt-20 md:flex w-full gap-[4px] mb-[40px]">
        {banners.map((banner) => (
          <button
            key={banner.alt}
            type="button"
            className="relative flex-1 min-w-0 overflow-hidden bg-transparent p-0 border-0 cursor-pointer"
          >
            <img
              src={banner.desktop}
              alt={banner.alt}
              width={720}
              height={244}
              loading="lazy"
              className="block w-full h-auto"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ShopTopBanners;
