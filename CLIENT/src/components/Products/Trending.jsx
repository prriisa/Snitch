
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Menu, X } from "lucide-react"
import { productCategories } from "../../utils/productCategories"

const categories = ["All", ...productCategories.filter((category) => category !== "Other")]
const genders = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" }
]

const Trending = ({ compact = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategory = searchParams.get("category") || ""
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState({ category: "", gender: "", minPrice: "", maxPrice: "" })
  const [filterError, setFilterError] = useState("")

  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(location.search)
    if (value) nextParams.set(key, value)
    else nextParams.delete(key)
    const query = nextParams.toString()
    navigate(query ? `/shop?${query}` : "/shop")
  }

  const openFilters = () => {
    setDraftFilters({
      category: searchParams.get("category") || "",
      gender: searchParams.get("gender") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || ""
    })
    setFilterError("")
    setIsFilterOpen(true)
  }

  const applyFilters = (event) => {
    event.preventDefault()
    if (draftFilters.minPrice && draftFilters.maxPrice && Number(draftFilters.minPrice) > Number(draftFilters.maxPrice)) {
      setFilterError("Minimum price cannot be greater than maximum price.")
      return
    }

    const nextParams = new URLSearchParams(location.search)
    for (const key of ["category", "gender", "minPrice", "maxPrice"]) {
      if (draftFilters[key]) nextParams.set(key, draftFilters[key])
      else nextParams.delete(key)
    }
    const query = nextParams.toString()
    navigate(query ? `/shop?${query}` : "/shop")
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setDraftFilters({ category: "", gender: "", minPrice: "", maxPrice: "" })
    setFilterError("")
  }

  return (
    <>
      <div className={`sticky top-[var(--snitch-header-h,74px)] z-30 bg-white flex flex-col items-start gap-3 ${compact ? "pt-2" : "pt-4"}`}>
        {!compact && <h2 className="px-4 uppercase text-[24px] leading-[26px] md:text-[36px] md:leading-none font-bold">Trending</h2>}
        <div className="flex w-full items-center gap-5 overflow-x-auto border-b border-[rgba(0,0,0,0.1)] px-3 pt-3 no-scrollbar">
          <button type="button" onClick={openFilters} aria-label="Open product filters" className="flex shrink-0 items-center justify-center p-1 hover:text-[#e64b2b]">
            <Menu size={21} strokeWidth={1.6} />
          </button>
          {categories.map((category) => {
            const value = category === "All" ? "" : category
            const isSelected = selectedCategory.toLowerCase() === value.toLowerCase()
            return (
              <button key={category} type="button" onClick={() => updateFilter("category", value)} aria-pressed={isSelected} className="relative flex items-center pb-3 shrink-0">
                <span className={`uppercase text-black whitespace-nowrap text-[14px] leading-normal ${isSelected ? "font-bold" : "font-light"}`}>
                  {category}
                </span>
                {isSelected && <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black" />}
              </button>
            )
          })}
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-black/45" onClick={(event) => {
          if (event.target === event.currentTarget) setIsFilterOpen(false)
        }}>
          <aside role="dialog" aria-modal="true" aria-labelledby="product-filter-title" className="flex h-full w-[min(88vw,360px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <h2 id="product-filter-title" className="text-sm font-semibold uppercase tracking-widest">Filter products</h2>
              <button type="button" onClick={() => setIsFilterOpen(false)} aria-label="Close filters" className="p-1"><X size={20} /></button>
            </div>
            <form onSubmit={applyFilters} className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex-1 space-y-6 p-5">
                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-widest">Category</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDraftFilters((current) => ({ ...current, category: "" }))}
                      aria-pressed={!draftFilters.category}
                      className={`border px-3 py-2 text-left text-xs uppercase tracking-wide ${!draftFilters.category ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"}`}
                    >
                      All categories
                    </button>
                    {productCategories.filter((category) => category !== "Other").map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setDraftFilters((current) => ({ ...current, category }))}
                        aria-pressed={draftFilters.category === category}
                        className={`border px-3 py-2 text-left text-xs uppercase tracking-wide ${draftFilters.category === category ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-widest">Gender</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setDraftFilters((current) => ({ ...current, gender: "" }))} aria-pressed={!draftFilters.gender} className={`border px-3 py-2 text-xs uppercase tracking-widest ${!draftFilters.gender ? "border-black bg-black text-white" : "border-neutral-300"}`}>All</button>
                    {genders.map(({ label, value }) => (
                      <button key={value} type="button" onClick={() => setDraftFilters((current) => ({ ...current, gender: value }))} aria-pressed={draftFilters.gender === value} className={`border px-3 py-2 text-xs uppercase tracking-widest ${draftFilters.gender === value ? "border-black bg-black text-white" : "border-neutral-300"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-widest">Price range</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <label className="text-xs text-neutral-500">
                      Min
                      <input type="number" min="0" value={draftFilters.minPrice} onChange={(event) => setDraftFilters((current) => ({ ...current, minPrice: event.target.value }))} className="mt-1 w-full border border-neutral-300 px-3 py-3 text-sm text-black" placeholder="0" />
                    </label>
                    <label className="text-xs text-neutral-500">
                      Max
                      <input type="number" min="0" value={draftFilters.maxPrice} onChange={(event) => setDraftFilters((current) => ({ ...current, maxPrice: event.target.value }))} className="mt-1 w-full border border-neutral-300 px-3 py-3 text-sm text-black" placeholder="No limit" />
                    </label>
                  </div>
                </fieldset>
                {filterError && <p role="alert" className="text-sm text-red-700">{filterError}</p>}
              </div>
              <div className="flex gap-3 border-t border-neutral-200 p-5">
                <button type="button" onClick={clearFilters} className="flex-1 border border-neutral-300 px-4 py-3 text-xs uppercase tracking-widest">Clear</button>
                <button type="submit" className="flex-1 bg-black px-4 py-3 text-xs uppercase tracking-widest text-white">Apply filters</button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </>
  );
};

export default Trending;