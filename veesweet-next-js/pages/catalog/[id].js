import Head from 'next/head'
import { useState,useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useRouter } from 'next/router'
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs'
import ColorSelect from '../../ui/ColorSelect/ColorSelect'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper"
import SingleDescription from '../../ui/SingleDescription/SingleDescription'
import CatalogItem from '../../ui/CatalogItem/CatalogItem'
import useGetCatalog from '../../queries/catalog/useGetProducts'
import useGetInterest from '../../queries/catalog/useGetInterest'
import { discountPrice } from '../../services/helpers/dicountPrice'
import { useBucketContext } from '../../context/bucketContext'

export default function Single() {
    const {query} = useRouter()
    const { increment } = useBucketContext();
    const [boolBought, setBoolBought] = useState(false)
    const [boolBoughtStatus, setBoolBoughtStatus] = useState(false)
    const [starterText, setStarterText] = useState("Додати до кошику")
    const { data } = useGetCatalog({id: query.id})
    const interest = useGetInterest()
    const [currentImg,setCurrentImg] = useState("")
    
    const addBucket = (id) => {
      increment(id)
      setBoolBoughtStatus(!boolBoughtStatus)
      setStarterText("Додано в кошик")
      setBoolBought(true)
    }

    useEffect(() => {
      setTimeout(() => {
        setStarterText("Додати до кошику")
        setBoolBought(false)
      }, 5000);
    },[boolBoughtStatus])

    return(
        <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_NAME_BRAND} ({data?.rows.length && data?.rows[0].title})</title>
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
                  { name:"Каталог", link:"/catalog" },
                  { name: data?.rows[0].title, link:"/catalog/" + data?.rows[0].id }
                  ]}/>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='single_info'>
                          <h1>{data?.rows[0].title}</h1>
                          <div className='single_info_price'>
                            <p className='single_info_price_new'>{discountPrice(data?.rows[0].discount, data?.rows[0].price)} грн</p>
                            {data?.rows[0].discount !== 0 &&
                            <div className='single_info_price_old_container'>
                              <p>{discountPrice(data?.rows[0].discount, data?.rows[0].price)} грн</p>
                              <span>-{data?.rows[0].discount}%</span>
                            </div>}
                          </div>
                      </div>
                      <ColorSelect 
                        data={data && JSON.parse(data?.rows[0].param)} />
                      <button
                        style={boolBought ? { background: "green"} : {}}
                        disabled={boolBought}
                        onClick={() => addBucket(query.id)} 
                        className='single_order_button'>{starterText}</button>
                    </div>
                    <div className='col-md-6'>
                      <div className='info_image_container_single'>
                        <div className='info_image_container_single_item'>
                          <img src={currentImg ? currentImg : data?.rows[0].gallery_products[0].url} />
                        </div>
                        <div className='info_image_container_single_item'>
                          <Swiper
                              spaceBetween={0}
                              slidesPerView={2}
                              modules={[Navigation]}
                              pagination={{ clickable: true }}               
                              direction="vertical"
                              scrollbar={{ draggable: true }}>
                                {data?.rows[0].gallery_products.map(({id,url}) => 
                                  <SwiperSlide key={id} onClick={() => setCurrentImg(url)}>
                                    <img style={{width:"100%", height:"100%"}} src={url} />
                                  </SwiperSlide>)}
                              </Swiper>
                        </div>
                      </div>

                      <SingleDescription 
                        title={"Опис"} 
                        description={data?.rows[0].description}/>

                    </div>
                  </div>

                  <div className="another_product_container">
                      <p className='another_product_title'>Можливо Вам буде цікаво...</p>
                      <div className='row'>
                        {interest?.data?.map((el) => 
                          <CatalogItem classCon='col-md-3' key={el.id} {...el}/>)}
                      </div>
                  </div>
              </div>
            </main>
        <Footer/>
      </div>
    )
}