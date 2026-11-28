import { normalizeProductCategory } from "./productCategories.js"

export const normalizeProductSearch = (value = "") =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

const tokenize = (value) => normalizeProductSearch(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.endsWith("s") && !term.endsWith("ses") ? term.slice(0, -1) : term)

export const filterProductsBySearch = (products, search, filters = {}) => {
    const normalizedQuery = normalizeProductSearch(search)
    const underPrice = normalizedQuery.match(/\b(?:under|below)\s+(\d+(?:\.\d+)?)\b/)
    const overPrice = normalizedQuery.match(/\b(?:over|above)\s+(\d+(?:\.\d+)?)\b/)
    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)
    const ignoredTerms = new Set(["for", "the", "under", "below", "over", "above", "less", "than", "men", "man", "women", "woman", "unisex"])
    const terms = tokenize(search).filter((term) => !ignoredTerms.has(term) && !/^\d+(?:\.\d+)?$/.test(term))
    const queryGender = queryWords.some((term) => ["women", "woman", "womens"].includes(term))
        ? "female"
        : queryWords.some((term) => ["men", "man", "mens"].includes(term))
            ? "male"
            : queryWords.includes("unisex")
                ? "unisex"
                : ""
    const minPrice = filters.minPrice !== "" ? Number(filters.minPrice) : overPrice ? Number(overPrice[1]) : null
    const maxPrice = filters.maxPrice !== "" ? Number(filters.maxPrice) : underPrice ? Number(underPrice[1]) : null

    return products.filter((product) => {
        const searchableTokens = tokenize(product.title || "")
        const matchesSearch = !terms.length || terms.every((term) =>
            searchableTokens.some((token) => token.startsWith(term))
        )
        const matchesCategory = !filters.category
            || normalizeProductCategory(product.category || "").toLowerCase() === normalizeProductCategory(filters.category).toLowerCase()
        const gender = filters.gender || queryGender
        const productGender = product.gender?.toLowerCase()
        const matchesGender = !gender || (gender === "unisex"
            ? productGender === "unisex" || productGender === "neutral"
            : productGender === gender)
        const amount = Number(product.price?.amount)
        const matchesMin = minPrice === null || !Number.isFinite(minPrice) || amount >= minPrice
        const matchesMax = maxPrice === null || !Number.isFinite(maxPrice) || amount <= maxPrice

        return matchesSearch && matchesCategory && matchesGender && matchesMin && matchesMax
    })
}
