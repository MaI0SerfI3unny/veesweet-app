const SingleDescription = ({title, description}) => {
    return(
        <div className='description_single_container'>
        <div className='description_single_container_head'>
          <p>{title}</p>
        </div>
        <div className='description_single_container_body'>
          
          <p dangerouslySetInnerHTML={{ __html: description }}/>
        </div>
      </div>
    )
}

export default SingleDescription