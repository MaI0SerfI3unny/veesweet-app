import Head from 'next/head'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ProductItemBucket from '../ui/ProductItemBucket/ProductItemBucket'
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs'
import useGetMyOrder from '../queries/orders/useGetMyOrder'
import { useBucketContext } from '../context/bucketContext'
import { getAllPrice } from '../services/helpers/getAllPrice'

export default function Bucket() {
    const { bucket, clearBucket, removeProduct, increment } = useBucketContext();
    const { data } = useGetMyOrder({arrProduct : bucket})
    return(
        <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_NAME_BRAND} - Корзина</title>
          <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
          <meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
        </Head>
        <Header/>
        <main>
        <div className="container">
            <Breadcrumbs value={[
              { name:"Головна", link:"/" },
              { name:"Корзина", link:"/bucket" }
            ]}/>
            <div className="row">
                <div className="col-md-6">
                  <div className="inventory_container">
                    <div className="inventory_info_container">
                        <div className="inventory_info_item">
                          <div>Ціна товарів:</div>
                          <div>{getAllPrice(data,bucket)} ГРН</div>
                        </div>
                        <div className="inventory_info_item">
                          <div>ПДВ:</div>
                          <div>0 ГРН</div>
                        </div>
                        <div className="inventory_info_item">
                          <div>Промокод:</div>
                          <div>- 0 ГРН</div>
                        </div>
                    </div>

                    <div className="main_info_price_container">
                      <div>Загальна сума:</div>
                      <div>{getAllPrice(data,bucket)} ГРН</div>
                    </div>

                    <div style={{textAlign:"center"}}>
                      {bucket.length !== 0 &&
                        <a href="/checkout">
                          <button>Перейти до оформлення <img src="/button_arrow_right.svg" alt="arrow right"/></button>
                        </a>}
                    </div>
                    
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="take_all_container">
                    {data?.map((el,key) => 
                      <ProductItemBucket 
                        key={key} 
                        {...el}
                        increment={increment}
                        clearBucket={clearBucket}
                        removeProduct={removeProduct}
                        bucket={bucket} />)}
                  </div>

                </div>
            </div>
        </div>
        </main>
        <Footer/>
      </div>
    )
}
