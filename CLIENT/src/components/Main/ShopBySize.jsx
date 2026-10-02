const ShopYourSize = () => {
  return (
    <section className="w-full">
      <button
        type="button"
        aria-label="Shop your size"
        className="relative flex w-full h-[120px] md:h-[180px] lg:h-[350px] xl:h-[400px] mb-4 items-center justify-center cursor-pointer bg-white overflow-hidden"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/Shop_your_size_6474c313-d237-46ef-89b5-37d0efb94d55.jpg?v=1788332482"
          alt="Shop Your Size"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </button>
    </section>
  );
};

export default ShopYourSize;