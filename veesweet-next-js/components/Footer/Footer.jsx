import useGetCategory from "../../queries/category/useGetCategory"
import Link from 'next/link';

const Footer = () => {
  const { data } = useGetCategory()
    return(
        <footer>
        <div className="container mt-1">
            <div className="row">
                <div className="col-md-3">
                    <img src = "/Logo.svg"/>
                </div>
                <div className="col-md-3">
                    <h4 className="mb-4">Популярні категорії</h4>
                    <ul>
                        {data && data?.slice(0,4).map(({title,id}) => 
                            <li key={id}>
                                <Link href={{ pathname: '/catalog', query: { category: id } }}>{title}</Link>
                            </li>)}
                    </ul>
                </div>
                <div className="col-md-3">
                    <h4 className="mb-4">Контакти</h4>
                    {process.env.NEXT_PUBLIC_URL_PHONE && 
                        <div className="contact_info_item"><img src="/footer_icon/Phone.svg"/> 
                            <a href={`tel:${process.env.NEXT_PUBLIC_URL_PHONE}`}>
                                {process.env.NEXT_PUBLIC_URL_PHONE}
                            </a>
                        </div>}
                    {process.env.NEXT_PUBLIC_URL_MAIL && 
                        <div className="contact_info_item"><img src="/footer_icon/Email.svg"/>
                            <a href={`mailto:${process.env.NEXT_PUBLIC_URL_MAIL}`}>
                                {process.env.NEXT_PUBLIC_URL_MAIL}
                            </a>
                        </div>}
                </div>
                <div className="col-md-3">
                    <h4 className="mb-4">Соціальні мережі</h4>
                    <div className="social_container">
                        {process.env.NEXT_PUBLIC_URL_INSTAGRAM && 
                        <a href={process.env.NEXT_PUBLIC_URL_INSTAGRAM} target="_blank">
                            <img src="/footer_icon/insta.svg"/>
                        </a>}
                        {process.env.NEXT_PUBLIC_URL_FACEBOOK && 
                        <a href={process.env.NEXT_PUBLIC_URL_FACEBOOK} target="_blank">
                            <img src="/footer_icon/facebook.svg"/>
                        </a>}
                    </div>
                </div>
            </div>
        </div>
        </footer>
    )
}

export default Footer