import { NavLink } from "react-router"

const btn = "flex h-[40px] w-full items-center justify-center uppercase text-[12px] leading-[17px] md:text-[16px] md:leading-normal"

const NotLoginWishList = ({ isEmpty = false }) => (
  <section className="mx-auto flex min-h-[calc(100dvh-58px)] w-full max-w-[480px] flex-col bg-white md:min-h-[calc(100dvh-155px)] md:max-w-xl md:justify-center">
    <div className="flex flex-1 flex-col items-center justify-center px-10 text-center md:flex-none">
      <h2 className="text-[18px] uppercase leading-normal">
        {isEmpty ? "Your wishlist is empty" : "Login to add items"}
      </h2>
      <p className="mx-6 my-2 text-[12px] leading-[17px] md:text-[14px] md:leading-[22px]">
        {isEmpty
          ? "Explore our latest styles and add your favourite products to your wishlist."
          : "Login to your account and save your favourite styles to your wishlist."}
      </p>
    </div>

    <div className="flex flex-col gap-2 px-4 py-2 md:mt-6 md:flex-row">
      {!isEmpty && (
        <NavLink to="/login" className={`${btn} bg-black text-white`}>
          Login
        </NavLink>
      )}
      <NavLink to="/shop" className={`${btn} border border-black bg-white text-black`}>
        Continue Shopping
      </NavLink>
    </div>
  </section>
)

export default NotLoginWishList