import CollectionContainer from "../../ui/CollectionContainer/CollectionContainer"

const Collection = ({collection}) => {
    return(
        <div>
            {collection?.map(({id,title,products}) => 
                      <div key={id} className="popular_collection_container">
                      <div className="container">
                        <div>
                            <h3>{title}</h3>
                            <CollectionContainer data={products}/>
                        </div>
                      </div>
                  </div>
            )}
        </div>
    )
}

export default Collection