const WishlistProductCardSkeleton = () => (
  <div className="flex min-w-0 animate-pulse flex-col" aria-hidden="true">
    <div className="h-[260px] w-full bg-gray-200 md:h-[296px]" />
    <div className="px-2 pb-2">
      <div className="mt-2 h-[14px] w-3/4 bg-gray-200" />
      <div className="mt-2 h-[12px] w-1/4 bg-gray-200" />
    </div>
    <div className="px-2 pb-6">
      <div className="h-9 w-full bg-gray-200" />
    </div>
  </div>
)

export default WishlistProductCardSkeleton