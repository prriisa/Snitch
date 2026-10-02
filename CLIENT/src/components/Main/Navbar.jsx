const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-[70] bg-white border-b border-black/10">
      <div className="flex items-center h-[58px] md:h-[86px] px-[25px] md:px-[40px] max-w-[480px] md:max-w-full mx-auto">
        
        {/* Left - Menu Button */}
        <div className="flex-1 flex items-center gap-[16px] md:gap-[24px]">
          <button type="button" aria-label="Menu" className="inline-flex items-center justify-center">
            <svg width="24" height="24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24">
              <path d="M4 5h16M4 12h16M4 19h16"></path>
            </svg>
          </button>
        </div>

        {/* Center - Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <button type="button" aria-label="Snitch home" className="inline-flex items-center justify-center">
            <svg width="120" height="34" viewBox="0 0 2629 518" fill="none">
              <g fill="#000" clipPath="url(#a)">
                <path d="M2241 38h113v170h161V38h114v442h-114V303h-161v177h-113V38Z" />
                <path d="M1020 38h113v442h-113V38Z" />
                <path d="M1281 38h349v95h-118v347h-113V133h-118V38Z" />
                {/* shortened for brevity */}
              </g>
              <defs>
                <clipPath id="a"><path fill="#FFF" d="M0 0h2629v518H0z"></path></clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex-1 flex items-center justify-end gap-[16px] md:gap-[24px]">
          {/* Search */}
          <button type="button" aria-label="Search" className="inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="m26.25 26.25-5.425-5.425m2.925-7.075c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z" stroke="#000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>

          {/* Bag */}
          <button type="button" aria-label="Bag" className="hidden md:inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="M15.375 3a4.375 4.375 0 0 1 4.375 4.375V8h2.5a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H8.5A2.5 2.5 0 0 1 6 25.5v-15A2.5 2.5 0 0 1 8.5 8H11v-.625A4.375 4.375 0 0 1 15.375 3Z" fill="#000"></path>
            </svg>
          </button>

          {/* Wishlist */}
          <button type="button" aria-label="Wishlist" className="hidden md:inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="M2.5 11.875A6.875 6.875 0 0 1 14.489 7.28a.7.7 0 0 0 1.022 0A6.862 6.862 0 0 1 27.5 11.875c0 2.862-1.875 5-3.75 6.875l-6.865 6.64a2.5 2.5 0 0 1-3.75.025L6.25 18.75c-1.875-1.875-3.75-4-3.75-6.875Z" stroke="#000" strokeWidth="1.25"></path>
            </svg>
          </button>

          {/* Profile */}
          <button type="button" aria-label="Profile" className="inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="M23.75 26.25v-2.5a5 5 0 0 0-5-5h-7.5a5 5 0 0 0-5 5v2.5M20 8.75a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" stroke="#000" strokeWidth="1.25"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
