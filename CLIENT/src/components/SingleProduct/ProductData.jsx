const CDN = "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/";
const img = (f) => `${CDN}${f}?quality=80`;

const ProductData = {
    title: "Stripes Patch Print Box Fit Shirt",
    price: 1299,
    rating: 4.2,
    ratings: 32,
    reviews: 8,
    images: [
        "1_f7654780-983b-4d49-a8e7-72a415e958ba.jpg",
        "2_3b041a2c-369b-4ce0-b96d-fdd3b1e209f3.jpg",
        "3_f469342e-4628-4815-a138-c6742383c026.jpg",
        "4_dbe4dddb-b495-4f62-89f3-e9107e520e50.jpg",
        "5_214800cf-3c19-48cc-8a79-083e184ef11f.jpg",
        "6_40fabd6e-fa47-4d87-a17f-76d13ee2d65f.jpg",
        "7_1dfe0402-a229-4ff8-acf8-c89eec0aafb9.jpg",
    ].map(img),
    offers: [
        ["TRYSNITCH5", "Enjoy 5% off on your first web order."],
        ["NEW10", "Enjoy 10% off on your first order above ₹2499"],
        ["NORETURN5", "5% OFF | No Returns | Exchange Available"],
    ],
    colors: [
        { name: "Black", image: img("1_c2c6cbce-5368-4310-aff4-5b31e5d7fbcc.jpg") },
        { name: "Blue", image: img("1_f7654780-983b-4d49-a8e7-72a415e958ba.jpg") },
        { name: "Green", image: img("4shs048-03-m_5.jpg") },
    ],
    selectedColor: 1,
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
        "Bold stripes meet artistic graphic prints in this box-fit shirt, crafted from 100% Viscose for a lightweight, breathable feel. The Cuban collar and short sleeves add a relaxed vibe, perfect for casual outings or weekend wear.",
    details: {
        "Size & Fit": ["Fit - Box Fit", "Size - Model Is Wearing Size M"],
        "Wash care": ["Machine Wash"],
        Specification: ["Pattern - Stripes", "Collar - Cuban", "Sleeve - Half Sleeve"],
    },
    sku: "4SHS048-05",
    returns: [
        "First-time customers enjoy free returns on their first order - no return fee applies.",
        "For all subsequent orders, a return fee of ₹25 per item is charged, upto ₹100 per order.",
        "Returns or Exchanges accepted within 7 days of delivery for Non - SNITCH X members, subject to applicable product and promotion eligibility criteria.",
        "Returns or Exchanges accepted within 30 days of delivery for SNITCH X members, subject to applicable product and promotion eligibility criteria.",
        "Orders placed using the NORETURN5 coupon are not eligible for returns. Only size exchanges are allowed.",
        "Prepaid orders will be refunded to the original payment method, COD orders can be refunded as wallet credits or directly to a UPI ID of your choice.",
        "Defective, incorrect, or damaged items must be reported within 24 hours of delivery for an eligible return.",
        "Items purchased under special promotions (such as BOGO offers, etc.) are not eligible for returns or exchanges.",
        "To ensure standard hygiene, certain product categories including Accessories, Sunglasses, and Perfumes cannot be returned once delivered.",
        "Exchanges are subject to availability of sizes.",
    ],
};

export default ProductData