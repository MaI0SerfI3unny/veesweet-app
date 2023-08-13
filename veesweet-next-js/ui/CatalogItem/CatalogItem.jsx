import { discountPrice } from "../../services/helpers/dicountPrice"

const CatalogItem = ({classCon = "col-md-4", title="", price, gallery_products,discount, id}) => {
    return(
        <div className={`${classCon} catalog_item_product`}>
            <a href={`/catalog/${id}`}>
            <div className='img_catalog_product_container'>
                {discount !== 0 &&
                <div className='discount_container_product'>
                     <p>-{discount}%</p>
                </div>}
                <div className='create_order_button'>
                    <img src="/cart.svg"  alt="cart"/>
                </div>
                <img  src={gallery_products && gallery_products[0].url} />
            </div>
            <div className="catalog_title">
                <p>{title.length > 25 ? title.slice(0,25)+"..." : title}</p>
            </div>
            <div className='catalog_product_body'>
                <div></div>
                <div>
                    <p>{discountPrice(discount, price)} ГРН</p>
                </div>
            </div>
            </a>
        </div>
    )
}

export default CatalogItem