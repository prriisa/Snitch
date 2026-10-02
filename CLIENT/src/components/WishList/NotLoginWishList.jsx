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

const SnitchWishlist = () => {
  return (
    <main className="pt-[58px] md:pt-[155px]">
      <div className="h-screen w-full max-w-[480px] md:max-w-full mx-auto bg-white">
        <div className="relative bg-white pb-16">
          <div
            className="flex flex-col justify-between max-w-[480px] md:max-w-4xl mx-auto bg-white md:pb-64"
            style={{ height: "calc(-80px + 100vh)" }}
          >
            <div className="md:hidden" />

            <div className="h-0 md:h-10" />

            <div className="flex flex-col items-center justify-center">
              <div className="text-center px-10">
                <h2
                  className="uppercase text-[18px] leading-normal"
                  style={heading}
                >
                  LOGIN TO ADD ITEMS
                </h2>

                <p
                  className="mx-6 my-2 text-[12px] leading-[17px] md:text-[14px] md:leading-[22px]"
                  style={body}
                >
                  Login to your account and save your favourite styles to your
                  wishlist.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center py-2 px-4 md:gap-x-2">
              <NavLink
                to="/login"
                className="w-full h-[40px] flex items-center justify-center bg-black text-white uppercase"
                style={body}
              >
                <span className="text-[12px] leading-[17px] md:text-[16px] md:leading-normal">
                  Login
                </span>
              </NavLink>

              <NavLink
                to="/shop"
                className="w-full h-[40px] mt-2 md:mt-0 flex items-center justify-center border border-black bg-white text-black uppercase"
                style={body}
              >
                <span className="text-[12px] leading-[17px] md:text-[16px] md:leading-normal">
                  Continue Shopping
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SnitchWishlist;