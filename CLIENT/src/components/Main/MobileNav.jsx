import React from "react";
import { NavLink } from "react-router";
import { Home, Search, ShoppingBag } from "lucide-react";

const MobileBottomNav = () => {
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/shop", icon: Search },
    { name: "Bag", path: "/cart", icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-2 left-0 right-0 z-50 w-full max-w-[480px] mx-auto px-6 md:hidden">
      <div className="grid grid-cols-3 w-full items-center gap-[15px] rounded-md bg-white/40 backdrop-blur-lg shadow px-2">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink key={name} to={path} className="flex-1">
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center justify-center w-full transition-all duration-200 ${
                  isActive ? "bg-[#F75C39]/20 rounded-[5px]" : ""
                }`}>
                <div className="flex flex-col items-center gap-[2px] rounded-[5px] px-2 py-1 my-2">
                  <Icon
                    size={24}
                    strokeWidth={1}
                    className={isActive ? "text-[#F75C39]" : "text-black/75"}/>
                  <span
                    className="text-black/75 whitespace-nowrap text-[8px] leading-normal"
                    style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {name}
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;