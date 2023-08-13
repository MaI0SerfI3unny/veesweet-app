const CollectionContainer = ({data}) => {
    if(data.length <= 3)
    {
        return(
            <div className="row">
                {data?.map(({id,gallery_products}) => 
                <div key={id} className={"col-md-"+( 12 / data.length )}>
                    <a href={`/catalog/${id}`}>
                    <div className="img_main_collection">
                        <img className="img-responsive" src={gallery_products[0].url}/>
                    </div>
                    </a>
                </div>)}
            </div>
        )
    }
    if(data.length >= 4)
    {
        return(
            <div className="row">                     
                <div className="col-md-6">
                <a href={`/catalog/${data[0].id}`}>
                    <div className="img_main_collection">
                        <img className="img-responsive" src={data[0].gallery_products[0].url} />
                    </div>
                </a>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <a href={`/catalog/${data[1].id}`}>
                                <div className="img_additional_collection">
                                    <img src={data[1].gallery_products[0].url}/>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a href={`/catalog/${data[2].id}`}>
                                <div className="img_plus_collection">
                                    <img src={data[2].gallery_products[0].url}/>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a href={`/catalog/${data[3].id}`}>
                                <div className="img_plus_collection">
                                    <img src={data[3].gallery_products[0].url}/>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CollectionContainer