import {
  User,
  MapPin,
  Package,
  RotateCcw,
  Gift,
  Heart,
  ShoppingBag,
  Store,
  Star,
  BadgeIndianRupee,
  PackagePlus,
  LayoutList,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { unAuthorize } from "../../redux/Slice/authSlice";
import { NavLink, useNavigate } from "react-router";

const BRAND_ORANGE = "#E54B29";
const HERO_IMAGE =
  "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/login_-_desktop.jpg?v=1791194138";

const sections = [
  {
    heading: "Account",
    items: [
      { icon: User, title: "Personal Information", path: "/account/profile" },
      { icon: MapPin, title: "Saved Addresses", path: "/account/addresses" },
    ],
  },
  {
    heading: "Shopping",
    items: [
      { icon: Package, title: "Orders", path: "/order" },
      { icon: RotateCcw, title: "Refunds", path: "/account/refunds" },
      { icon: Heart, title: "Wishlist", path: "/wishlist" },
      { icon: ShoppingBag, title: "Cart", path: "/cart" },
      { icon: Gift, title: "Gifting", path: "/gift-card" },
      { icon: Store, title: "Find a Store", path: "/store-near-me" },
      { icon: Star, title: "Rate & Review", path: "/account/rate-and-review" },
    ],
  },
  {
    heading: "Community",
    items: [
      { icon: BadgeIndianRupee, title: "Create and Earn", path: "/join-creator-squad" },
    ],
  },
];

// Sirf role === "seller" wale users ko dikhega
const sellerSection = {
  heading: "Seller",
  items: [
    { icon: PackagePlus, title: "Create Product", path: "/seller/create-product" },
    { icon: LayoutList, title: "View All Products", path: "/seller/products" },
  ],
};

const Me = () => {
  const user = useSelector((state) => state.auth.user);

  const isSeller = user?.role === "seller";

  // Seller section Shopping ke baad, Community se pehle
  const visibleSections = isSeller
    ? [sections[0], sections[1], sellerSection, ...sections.slice(2)]
    : sections;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Replace with real membership data when available
  const membership = {
    expiresOn: "09 Oct",
    spendToUnlock: 5000,
    progress: 0, // 0 - 100
  };

  const logOut = () => {
    dispatch(unAuthorize());
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-white text-black md:min-h-fit">
      <div className="bg-white pb-20 md:mx-auto md:max-w-[1200px] md:px-0 md:pb-0">
        {/* Hero */}
        <div className="relative w-full">
          <div
            className="absolute inset-0 bg-neutral-800 bg-cover bg-center"
            style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
          />

          <div className="relative z-10 flex w-full flex-col pt-4 md:flex-row md:pb-2 md:pt-2">
            {/* Left: welcome + expiry */}
            <div className="flex min-w-0 flex-[2] flex-col justify-between md:pb-4">
              <div className="mx-4 flex items-start gap-1">
                <button
                  type="button"
                  aria-label="Back"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center py-3 pr-2 md:hidden"
                >
                  <ChevronLeft size={24} strokeWidth={1.25} />
                </button>

                <div className="flex flex-col">
                  <span className="text-[10px] font-light uppercase leading-[14px] md:text-[12px] md:leading-normal">
                    Welcome
                  </span>
                  <span className="text-[20px] font-bold uppercase md:text-[30px]">
                    {user?.name}
                  </span>
                </div>
              </div>

              <div className="mb-[10px] mr-4 mt-[5px] flex justify-end">
                <div className="bg-white px-2 py-1">
                  <p
                    className="text-[14px] md:text-[16px]"
                    style={{ color: BRAND_ORANGE }}
                  >
                    Expired on
                    <span className="px-1 font-bold">{membership.expiresOn}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: membership panel */}
            <div className="min-w-0 flex-[4]">
              <div className="mt-[92px] bg-black/60 p-5 backdrop-blur-lg md:relative md:-left-2 md:mt-0">
                <div className="pb-4">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-[12px] uppercase text-white md:text-[14px]">
                      Spend more to unlock membership
                    </h3>
                    <span className="text-[16px] font-bold uppercase tracking-[0.2em] text-white">
                      Snitch<span className="ml-1">✕</span>
                    </span>
                  </div>

                  <NavLink
                    to="/membership"
                    className="inline-flex h-[28px] w-[102px] items-center justify-center bg-white"
                  >
                    <span className="text-[10px] uppercase text-black md:text-[12px]">
                      View Benefits
                    </span>
                  </NavLink>
                </div>

                {/* Progress */}
                <div className="flex w-full items-center">
                  <div className="h-px flex-1 rounded-full bg-neutral-500">
                    <div
                      className="h-px rounded-full bg-[#d9c7a8] transition-all duration-75"
                      style={{ width: `${membership.progress}%` }}
                    />
                  </div>
                  <div className="rounded-full bg-neutral-100 p-1">
                    <Gift size={20} strokeWidth={1.25} color={BRAND_ORANGE} />
                  </div>
                </div>

                <p className="mt-2 text-[12px] font-light text-white md:text-[14px] md:leading-[22px]">
                  Spend
                  <span className="px-1 font-bold">
                    ₹{membership.spendToUnlock}
                  </span>
                  to unlock.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu sections */}
        <div className="bg-white px-4 pt-8 md:px-0">
          <div className="flex flex-col gap-10">
            {visibleSections.map((section) => (
              <div key={section.heading} className="flex flex-col">
                <p className="px-1 pb-2 text-[11px] uppercase text-neutral-500 md:text-[14px]">
                  {section.heading}
                </p>

                <div className="divide-y divide-neutral-200 border border-neutral-200">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        className="flex items-center justify-between px-4 py-[14px]"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} strokeWidth={1.25} />
                          <span className="text-[12px] font-light uppercase leading-[17px] md:text-[14px] md:leading-[22px]">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight size={20} strokeWidth={1.25} />
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center justify-center gap-10 px-5 py-8 text-[12px] uppercase">
            <NavLink to="/contact-us" className="underline">
              Help
            </NavLink>
            <NavLink to="/account/settings" className="underline">
              Settings
            </NavLink>
            <button type="button" onClick={logOut} className="uppercase underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;