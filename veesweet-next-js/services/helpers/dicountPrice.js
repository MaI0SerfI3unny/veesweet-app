export const discountPrice = (discount,price) => {
    return price - (price * (discount / 100));
}