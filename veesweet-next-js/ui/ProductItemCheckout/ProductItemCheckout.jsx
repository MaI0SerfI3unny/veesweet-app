import { countOccurrences } from "../../services/helpers/countOccurrences"
import { discountPrice } from "../../services/helpers/dicountPrice"

const ProductItemCheckout = ({title,id,price,discount,bucket,gallery_products,param}) => {
    return(
        <div class="order_item">
        <div>
            <img class="take_product_img" src={gallery_products && gallery_products[0].url} alt="product name"/>
        </div>
        <div style={{width:"100%"}}>
            <h2>{title}</h2>
                <div class="order_info">
                    <div class="order_info_item">
                        {JSON.parse(param)?.map((el,key) => 
                            <div key={key} class="info_order_container">
                                <div><p>{key ? "Розміри:" : "Кольори:" }</p></div>
                                <div><p>{el}</p></div>
                            </div>)}
                        <div class="info_order_container">
                            <div><p>Кількість:</p></div>
                            <div><p>{countOccurrences(bucket,id)}</p></div>
                        </div>
                    </div>
                    <div class="order_info_item"><p>{discountPrice(discount, price)} ГРН</p></div>
                </div>
            </div>
        </div>
    )
}

export default ProductItemCheckout