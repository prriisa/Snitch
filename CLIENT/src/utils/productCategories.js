export const productCategories = [
    "Shirt", "Top", "T-Shirt", "Jean",
    "Trouser", "Footwear", "Cargo pant", "Jogger", "Short", "Overshirt",
    "Luggage", "Perfume", "Accessory", "Bag", "Belt", "Dress", "Sunglass",
    "Sweater", "Jacket", "Other"
]

const legacyProductCategoryAliases = new Map([
    ["shirts", "Shirt"],
    ["tops", "Top"],
    ["t-shirts", "T-Shirt"],
    ["t-shirts | polo", "T-Shirt"],
    ["jeans", "Jean"],
    ["trousers", "Trouser"],
    ["cargo pants", "Cargo pant"],
    ["joggers", "Jogger"],
    ["shorts", "Short"],
    ["overshirts", "Overshirt"],
    ["perfumes", "Perfume"],
    ["accessories", "Accessory"],
    ["bags", "Bag"],
    ["belts", "Belt"],
    ["sunglasses", "Sunglass"],
    ["sweaters", "Sweater"],
    ["jackets", "Jacket"],
    ["bestsellers", "Other"],
    ["outerwear", "Other"],
    ["linen edit", "Other"],
    ["basics | core lab", "Other"],
    ["last chance", "Other"],
    ["snitch plus", "Other"],
    ["snitch luxe", "Other"],
    ["celeb collabs", "Other"],
    ["price drop", "Other"]
])

export const normalizeProductCategory = (category = "") =>
    legacyProductCategoryAliases.get(category.toLowerCase()) || category
