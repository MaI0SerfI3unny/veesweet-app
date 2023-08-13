import { discountPrice } from "./dicountPrice"

export const getAllPrice = (arr,bucket) => {
    let starterPrice = 0
    bucket?.map((el) => {
        const findById = arr?.find(item => item.id == el)
        starterPrice += discountPrice(findById?.discount, findById?.price)
    })
    return starterPrice
}