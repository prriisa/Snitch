export const calculateOrderFees = (subtotal, currency) => {
    const platformFee = currency === "INR" ? 5 : 0
    const deliveryFee = currency === "INR" && subtotal < 999 ? 99 : 0

    return {
        platformFee,
        deliveryFee,
        totalAmount: subtotal + platformFee + deliveryFee
    }
}
