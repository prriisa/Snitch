import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useDebouncedThrottledValue from "../../hooks/useDebouncedThrottledValue";

const searchTexts = [
  'Search "POLO SHIRTS"',
  'Search "LINEN SHIRTS"',
  'Search "WHITE SHIRTS"',
  'Search "POLO T-SHIRTS"',
  'Search "BLACK SHIRTS"',
  'Search "STRAIGHT FIT JEANS"',
  'Search "FORMAL SHIRT"',
  'Search "CLUB WEAR"',
  'Search "BAGGY JEANS"',
  'Search "CHECK SHIRTS"',
];

const ShopSearch = () => {
  const [index, setIndex] = useState(0);
  const [searchState, setSearchState] = useState({ locationKey: "", value: "" })
  const navigate = useNavigate()
  const location = useLocation()
  const currentSearch = new URLSearchParams(location.search).get("search") || ""
  const query = searchState.locationKey === location.key ? searchState.value : currentSearch
  const throttledSearch = useDebouncedThrottledValue(query)
  const lastNavigatedSearch = useRef(currentSearch)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % searchTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const search = throttledSearch.trim()
    if (search !== query.trim()) return
    if (search === currentSearch) {
      lastNavigatedSearch.current = search
      return
    }
    if (search === lastNavigatedSearch.current) return

    lastNavigatedSearch.current = search
    navigate(search ? `/shop?search=${encodeURIComponent(search)}` : "/shop", { replace: true })
  }, [throttledSearch, query, currentSearch, navigate])

  const submitSearch = (event) => {
    event.preventDefault()
    const search = query.trim()
    lastNavigatedSearch.current = search
    navigate(search ? `/shop?search=${encodeURIComponent(search)}` : "/shop")
  }

  return (
    <div className="bg-white pt-[58px] md:hidden">
      <div className="w-[98%] mx-auto py-[15px]">
        <form onSubmit={submitSearch} className="flex items-center mt-2 relative w-full">
          <div className="relative flex items-center h-[40px] mx-[16px] border border-black flex-1 cursor-pointer">
            <Search size={28} strokeWidth={1.25} className="ml-2 shrink-0" />

            <input
              type="text"
              value={query}
              onChange={(event) => setSearchState({ locationKey: location.key, value: event.target.value })}
              placeholder={searchTexts[index].replace(/^Search /, "").replace(/"/g, "")}
              aria-label="Search products"
              className="relative z-10 flex flex-1 h-full w-full bg-transparent focus:outline-none px-3 text-xs"
            />
            <button type="submit" aria-label="Submit product search" className="relative z-10 h-full px-3 text-xs font-medium uppercase tracking-wide">Go</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;