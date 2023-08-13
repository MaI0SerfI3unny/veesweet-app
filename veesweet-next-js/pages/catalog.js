import Head from 'next/head'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs'
import SelectMenu from '../ui/SelectMenu/SelectMenu'
import CatalogItem from '../ui/CatalogItem/CatalogItem'
import FilterItem from '../ui/FilterItem/FilterItem'
import Paginate from "../components/Paginate/Paginate"
import FilterSlider from '../ui/FilterSlider/FilterSlider'
import useGetCatalog from "../queries/catalog/useGetProducts"
import { sizeArr, arrV } from '../mock/mock'

export default function Catalog() {
    const { query } = useRouter()
    const [page, setPage] = useState(1)
    const [pageSize] = useState(9)
    const [currentVal,setCurrentVal] = useState({ title: "-", val:"" })
    const [price, setPrice] = useState([0,30000])
    const [size, setSize] = useState([])

    const catalog = useGetCatalog({ 
        page: page-1, 
        pageSize, 
        search: query.search, 
        sort: currentVal.val, 
        categoryId: query.category,
        priceRange : price,
        size
    })
    return(
        <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_NAME_BRAND} - Каталог</title>
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
                { name:"Каталог", link:"/catalog" }
                ]}/>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='catalog_menu'>
                            <FilterSlider title="Ціна" min={0} max={3000} onFunc={setPrice}/>
                            <FilterItem 
                                title="Розмір" 
                                size={size} 
                                setSize={setSize}
                                arr={sizeArr} />                         
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='main_menu_catalog'>
                            <div className='main_menu_catalog_item'>
                            </div>
                            <div className='main_menu_catalog_item'>
                                <p>Cортувати за:</p>
                                <SelectMenu 
                                currentValue={currentVal} 
                                setCurrentValue={setCurrentVal}
                                arrVal={arrV} />
                            </div>
                        </div>

                        <div className="body-catalog-product">
                            <div className='row'>
                                {catalog?.data?.rows?.map((el) => 
                                    <CatalogItem key={el.id} {...el}/>)}
                            </div>
                            <div>
                                <Paginate
                                    page={page}
                                    postsPerPage={pageSize} 
                                    setPage={setPage}
                                    totalPosts={catalog?.data?.count}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
      </div>
    )
}