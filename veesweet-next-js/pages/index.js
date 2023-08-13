import Head from 'next/head'
import Footer from '../components/Footer/Footer'
import Preview from '../components/Preview/Preview'
import PopularCategory from '../components/PopularCategory/PopularCategory'
import Collection from '../components/Collection/Collection'
import Slider from '../components/Slider/Slider'
import useGetCategory from "../queries/category/useGetCategory"
import useGetBanner from "../queries/banner/useGetBanner"
import useGetCollection from "../queries/collection/useGetCollection"

export function getStaticProps({locale}){
  return {
    props:{ locale }
  }
}

export default function Home() {
  const category = useGetCategory()
  const banner = useGetBanner()
  const collection = useGetCollection()
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME_BRAND}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
        <meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
      </Head>
        <main>
          <Slider banner={banner.data} />
          <PopularCategory category={category.data}/>
          <Preview/>
          <Collection collection={collection.data}/>
        </main>
      <Footer/>
    </div>
  )
}
