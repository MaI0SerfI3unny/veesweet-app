import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ListCheckout from '../ui/ListCheckout/ListCheckout'
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs'
import InputCheckout from '../ui/InputCheckout/InputCheckout'
import RadioButtonCheckout from '../ui/RadioButtonCheckout/RadioButtonCheckout'
import { useBucketContext } from '../context/bucketContext'
import { getAllPrice } from '../services/helpers/getAllPrice'
import useGetMyOrder from '../queries/orders/useGetMyOrder'
import { deliveryType, paymentType, checkoutForm } from '../mock/mock'
import useCreateOrder from '../mutation/order/useCreateOrder'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { Toastify } from '../ui/Toastify/Toastify'
import { validText, validEmail, validPhone } from '../services/helpers/validationForm'
import Router from 'next/router'

export default function Checkout() {
    const { bucket,clearAllBucket } = useBucketContext();

    const { data } = useGetMyOrder({arrProduct : bucket})
    const mutation = useMutation(useCreateOrder);
    
    const [formData, setFormData] = useState({ 
        first_name: '', 
        middle_name: '', 
        last_name: '',
        email: '',
        phone: '',
    })
    const [delivery,setDelivery] = useState("novapochta")
    const [payment,setPayment] = useState("getter")

    const handleAddOrder = async() => {
        const {first_name, middle_name, last_name, email, phone } = formData
        let boolValidation = true
        if(!first_name || !middle_name || 
            !last_name || !email || !phone)
                return Toastify("Не заповнені необхідні поля")
        
        Object.keys(formData).map(key => {
            if(key === "first_name" || 
               key === "middle_name" || 
               key === "last_name")
            {
                if(validText(formData[key])) boolValidation = false
            }
            if(key === "phone")
            {
                if(validPhone(formData[key])) boolValidation = false                
            }
            if(key === "email")
            {
                if(validEmail(formData[key])) boolValidation = false
            }
        })

        if(!boolValidation)
            return Toastify("Є неправильно заповнені поля")

        try{
            const result = await mutation.mutateAsync({
                first_name, 
                middle_name, 
                last_name, 
                email, 
                phone,
                deliveryType: delivery,
                payment
            });
            if(result.data.status === 200)
            {
                clearAllBucket()
                Router.push({ pathname: '/success' })
            }
        }catch(_){
            console.log(_)
            return Toastify("Сталася помилка. Спробуйте пізніше")
        }
        setFormData({ 
            first_name: '', 
            middle_name: '', 
            last_name: '',
            email: '',
            phone: '',
        })
    }

    return(
        <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_NAME_BRAND} - Оплата</title>
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
                { name:"Оформлення", link:"/checkout" }
                ]}/>
            <div class="row">
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

                        <ListCheckout data={data} bucket={bucket}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="order_create_form">
                        <div className="contact_info_container">
                            <h3>Контактна інформація</h3>
                            <div className="row">
                                {checkoutForm.map((el,key) =>  
                                    <InputCheckout 
                                    key={key}
                                    {...el}
                                    formData={formData} 
                                    setFormData={setFormData}/>)}
                            </div>
                        </div>

                        <div className="send_info_container">
                            <h3>Доставка</h3>
                            {deliveryType.map((el,key) => 
                                <RadioButtonCheckout {...el} key={key} setVal={setDelivery} currentValue={delivery}/>)}
                        </div>

                        <div className="payment_form_container">
                            <h3>Оплата</h3>
                            {paymentType.map((el,key) => 
                                <RadioButtonCheckout {...el} key={key} setVal={setPayment} currentValue={payment}/>)}
                            <div className="button_payment_accept"><button onClick={() => handleAddOrder()}>Замовити</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </main>
        <Footer/>
        <ToastContainer />
      </div>
    )
}