import { discountPrice } from "../../services/helpers/dicountPrice"
import { countOccurrences } from "../../services/helpers/countOccurrences"

const ProductItemBucket = ({id,title,gallery_products,price,param,discount,bucket,clearBucket,removeProduct,increment}) => {    
    return(
        <div className="take_product_item">
            <div style={{width:"30%"}}>
                <img 
                className="take_product_img" 
                src={gallery_products && gallery_products[0].url} 
                alt={title}/>
            </div>
            
            <div style={{width:"70%"}}>
                <div className="additional_take_product_item">
                <div className="take_title_product_item">
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <div>
                        <img onClick={() => clearBucket(id)} style={{cursor:"pointer"}} src="/trash.svg"/>
                    </div>
                </div>

                <div className="characteristics_item">
                    {JSON.parse(param)?.map((el,key) => 
                    <div key={key}>
                        <p>{key ? "Розміри: " : "Кольори: " }{el}</p>
                    </div>)}
                </div>

                <div className="pannel_take_control">
                    <div className="pannel_take_control_item">
                    <span onClick={() => removeProduct(id)}>-</span>
                    <p>{countOccurrences(bucket,id)}</p>
                    <span onClick={() => increment(id)}>+</span>
                    </div>
                    
                    <div className="pannel_take_control_item">
                        {discount === 0 ? 
                            <div>
                                <p className="new_price_take">{price} ГРН</p>
                            </div> 
                            :
                            <div>
                                <p className="old_price_take">{price} грн</p>
                                <p className="new_price_take">{discountPrice(discount, price)} ГРН</p>
                            </div>
                        }
                    </div>
                </div>                
            </div>
        </div>
        </div>
    )
}

export default ProductItemBucket