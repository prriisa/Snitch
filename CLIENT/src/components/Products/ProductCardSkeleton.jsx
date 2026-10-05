export default function ProductCardSkeleton() {
  return (
    <div className="relative w-full animate-pulse" aria-hidden="true">
      {/* image */}
      <div className="w-full aspect-[220/296] bg-[#ececec]" />

      <div className="px-2 pb-2">
        {/* title */}
        <div className="mt-2 h-[14px] w-3/4 bg-[#ececec] rounded-sm" />

        <div className="flex items-start justify-between w-full">
          <div className="mt-2">
            {/* price */}
            <div className="h-[14px] w-12 bg-[#ececec] rounded-sm" />
            {/* color dots */}
            <div className="flex items-center my-2">
              <div className="w-2 h-2 mr-1 bg-[#ececec]" />
              <div className="w-2 h-2 mr-1 bg-[#ececec]" />
              <div className="w-2 h-2 mr-1 bg-[#ececec]" />
            </div>
          </div>
          {/* add button */}
          <div className="mt-1 mb-4 h-5 w-5 bg-[#ececec] rounded-sm" />
        </div>
      </div>
    </div>
  );
}