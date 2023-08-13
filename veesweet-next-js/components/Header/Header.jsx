import { useState } from "react"
import useGetTypeCategory from "../../queries/category/useGetTypeCategory"
import Router from 'next/router'
import Link from 'next/link';
import { useBucketContext } from "../../context/bucketContext";

const Header = () => {
    const { count } = useBucketContext();
    const {data} = useGetTypeCategory()
    const [ menuVision, setMenuVision ] = useState(false)
    const [search, setSearch] = useState("")

    const setSearchFunc = () => {
        setMenuVision(false)
        Router.push({
            pathname: '/catalog',
            query: { search: search },
        })
    }

    const changeSearchFunc = (e) => {
        setMenuVision(false)
        if(e.key === 'Enter')
            Router.push({
                pathname: '/catalog',
                query: { search: search },
            })
    }

    return(
        <header>
            <div className="container-fluid">
            <div className="row mt-2 ml-2 mr-2">
                <div className="col-md-3">
                    <a href="/">
                        <img src="/Logo.svg"/>
                    </a>
                </div>
                <div className="col-md-9 align-self-center">
                    <div style={{alignItems :"center"}} className="row justify-content-end">
                            <div className="menu_desktop">
                                <p onClick={() => setMenuVision(!menuVision)}>Категорії</p>
                            </div>

                            <div className="search_container">
                                <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={changeSearchFunc}
                                type="text" 
                                placeholder="Пошук..."/>
                                <img 
                                onClick={() => setSearchFunc()} 
                                src="/header_icon/search.svg" 
                                alt="search"/>
                            </div>

                            <div className="magazine_button">
                                <a href="/bucket"><img src="/header_icon/magazine.svg"/></a>
                                {count !== 0 && <span>{count}</span>}
                            </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        {menuVision ?
            <div className="category_container_menu">
                <div className="container">
                    <div className="row">
                        {data?.map(({id,title,categories}) => 
                            <div key={id} className="col-md-4 mt-5">
                                <p className="category_title_menu">{title}</p>
                                <ul>
                                    {categories?.map(({id,title}) => 
                                        <li key={id}>
                                            <Link 
                                                onClick={() => setMenuVision(false)} 
                                                href={{ pathname: '/catalog', query: { category: id } }}>{title}</Link>
                                        </li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        : null}
        </header>
    )
}

export default Header