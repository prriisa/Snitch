import React from "react";
import { NavLink } from "react-router";

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const heading = {
  fontFamily: FONT,
  fontWeight: 700,
};

const body = {
  fontFamily: FONT,
  fontWeight: 400,
};

const iconBtn = "inline-flex items-center justify-center";

export function CartHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div className="flex items-center h-[58px] md:h-[86px] px-[25px] md:px-[40px] border-b border-black/10 md:border-b-0 max-w-[480px] md:max-w-full mx-auto bg-white">

        <div className="flex-1 flex items-center gap-[16px] md:gap-[24px]">
          <NavLink to="/shop">
            <button type="button" aria-label="Menu" className={iconBtn}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </NavLink>

          <h1
            className="uppercase md:hidden text-black text-[24px] leading-[26px]"
            style={heading}
          >
            Bag
          </h1>
        </div>

        <div className="hidden md:flex shrink-0 items-center justify-center">
          <span
            className="text-[28px] tracking-[2px]"
            style={heading}
          >
            SNITCH
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end gap-[16px] md:gap-[24px]">
          <NavLink to="/wishlist">
            <button type="button" aria-label="Wishlist" className={iconBtn}>
              <svg
                className="w-5 h-5 md:w-7 md:h-7"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M2.5 11.875A6.875 6.875 0 0 1 14.489 7.28a.7.7 0 0 0 1.022 0A6.862 6.862 0 0 1 27.5 11.875c0 2.862-1.875 5-3.75 6.875l-6.865 6.64a2.5 2.5 0 0 1-3.75.025L6.25 18.75c-1.875-1.875-3.75-4-3.75-6.875Z"
                  stroke="#000"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </NavLink>
        </div>
      </div>

      <div className="hidden md:block bg-white">
        <div className="mx-[90px] py-4 border-b border-black/10">
          <h1
            className="uppercase text-black text-[36px] leading-none"
            style={heading}
          >
            Bag
          </h1>
        </div>
      </div>
    </header>
  );
}

const SnitchEmptyBag = () => {
  return (
    <main className="md:pt-[155px]">
      <div className="h-screen bg-white w-full max-w-[480px] md:max-w-full mx-auto">
        <div className="pb-16 bg-white relative">

          <div
            className="flex flex-col justify-between max-w-[480px] md:max-w-4xl mx-auto bg-white md:pb-64"
            style={{ height: "calc(-80px + 100vh)" }}
          >
            <div className="md:hidden" />
            <div className="h-8 md:h-10" />

            <div className="flex flex-col items-center justify-center">
              <div>
                <img
                  alt="Empty bag"
                  loading="lazy"
                  width="230"
                  height="130"
                  src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/Your_bag_is_empty_black.gif?v=1787833033"
                />
              </div>

              <div className="mt-4">
                <h2
                  className="text-center uppercase text-[18px] leading-normal"
                  style={heading}
                >
                  YOUR BAG IS EMPTY
                </h2>

                <p
                  className="text-center text-gray-900 mx-10 my-2 text-[12px] leading-[17px] md:text-[14px] md:leading-[22px]"
                  style={body}
                >
                  Looks like your style radar is primed and ready, but the
                  wishlist is whispering for some fashionable company.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center py-2 px-4 md:gap-x-2">
              <NavLink to="/shop" className="transition inline-flex items-center justify-center uppercase w-full text-white bg-black hover:bg-gray-800 h-[40px]">
                <span
                  className="text-[12px] leading-[17px] md:text-[16px] md:leading-normal"
                  style={body}
                >
                  Start Shopping
                </span>
              </NavLink>

              <NavLink to="/wishlist" className="transition inline-flex items-center justify-center uppercase w-full text-black bg-white border border-black hover:bg-gray-200 h-[40px] mt-2 md:mt-0">
                <span
                  className="text-[12px] leading-[17px] md:text-[16px] md:leading-normal"
                  style={body}
                >
                  Add from wishlist
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SnitchEmptyBag;