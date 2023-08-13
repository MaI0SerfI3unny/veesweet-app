import {useState,useEffect} from 'react';
import '../styles/style.scss'
import '../styles/bootstrap.css'
import 'swiper/css';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css/navigation';
import { AppWithTranslation } from 'next-i18next';
import { BucketProvider } from '../context/bucketContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Header from '../components/Header/Header';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    const store = localStorage.getItem("VeeSweetS");
    if(!store)
      localStorage.setItem("VeeSweetS", JSON.stringify([]))
  }, [])

  return (
    <BucketProvider>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </BucketProvider>
  )
}

export default MyApp;