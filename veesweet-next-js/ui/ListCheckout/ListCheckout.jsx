import { useState } from "react"
import ProductItemCheckout from "../ProductItemCheckout/ProductItemCheckout"

const ListCheckout = ({data,bucket}) => {
    const [vision, setVision] = useState(true)
    return(
        <div class="list_order_container">
            <div onClick={() => setVision(!vision)} class="header_list_order">
                <div>
                    <p>Замовлення</p>
                </div>
                <div>
                    <img
                    style={{
                        transition:"0.5s",
                        transform: vision ? "rotate(0deg)" : "rotate(180deg)"
                    }}
                    src="/arrow_order.svg"/>
                </div>
            </div>
            {vision?
                <div class="body_list_order">
                    {data?.map((el,key) => <ProductItemCheckout key={key} {...el} bucket={bucket}/>)}
                </div>
            : null}
        </div>
    )
}

export default ListCheckout