const Breadcrumbs = ({ value }) => {
    return(
        <div className="breadcrumbs_container">
            {value?.map((el,key) => 
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }} key={key}>
                    <img src="/arrow_bread.svg" alt="arrow"/>
                    <a href={el.link}>{el.name}</a>
                </div>
            )}
        </div>
    )
}

export default Breadcrumbs