export const normalizeProductSearch = (value = "") =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

export const filterProductsBySearch = (products, search) => {
    const query = normalizeProductSearch(search)
    if (!query || query === "all" || query === "all products" || query === "shop all") return products
    const terms = query.split(/\s+/).map((term) => term.endsWith("s") && !term.endsWith("ses") ? term.slice(0, -1) : term)

    return products.filter((product) => {
        const searchableText = ` ${normalizeProductSearch(`${product.title || ""} ${product.description || ""}`)} `
        return terms.every((term) => searchableText.includes(` ${term}`))
    })
}
