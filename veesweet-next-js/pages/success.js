import Head from 'next/head'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function Success() {
    return(
        <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_NAME_BRAND} - Успішно</title>
          <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
          <meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
        </Head>
        <Header/>
        <main style={{
                alignItems:"center",
                display:"flex"
            }}>
            <div className="container text-center order-container">
                <h5 className="title_order">Ваше замовлення оформлено успішно!</h5>
                <p className="description_order">Ми вже обробляємо Ваше замовлення і починаємо працювати над ним.<br/>
                    Якщо у нас виникнуть запитання - ми зателефонуємо Вам.</p>
                <p className="end_description_order">Дякуємо, що обрали саме нас!</p>
                <a href="/">
                    <button>Повернутись на головну <img src="/button_arrow_top.svg" alt="arrow"/></button>
                </a>
            </div>
        </main>
        <Footer/>
      </div>
    )
}