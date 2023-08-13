import Link from "next/link"

const PopularCategory = ({category}) => {
    return (
        <div className="category_list_container">
        <h2>Популярні категорії</h2>
        <div className="container">
            <div className="container_scroll">    
                <div className="container_cat">
                    <div className="row m-0">
                        {category?.map(({id, photo,title}) => 
                            <div key={id} className="category_item">
                                <Link style={{textDecoration:"none"}} href={{ pathname: '/catalog', query: { category: id } }}>
                                <div className="img_category_container">
                                    <img src={process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL+photo} alt={title}/>
                                </div>
                                <p>{title}</p>
                                </Link>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PopularCategory