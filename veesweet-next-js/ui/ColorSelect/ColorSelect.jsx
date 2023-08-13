const ColorSelect = ({data}) => {
    return(
        <div className='single_info_colors'>
        <p>Параметри</p>
        <div className='container_single_colors'>
          {data?.map((el,key) => <p key={key}>{key ? "Розміри: " : "Кольори: " }{el}</p>)}
        </div>
      </div>
    )
}

export default ColorSelect