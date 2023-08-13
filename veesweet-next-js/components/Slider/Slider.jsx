import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = ({banner}) => {
    return(
        <div className="container main_slider">
        <Swiper
        spaceBetween={0}
        slidesPerView={1}>
          {banner?.map(({id,title,description,bottom_description,link,discount,photo}) => 
            <SwiperSlide key={id}>
              <a href={link}>
              <div className="discount_slider">-{discount}%</div>
              
                <div className="content-slider-title">
                  <p className="subtitle_slider">{title}</p>
                  <h2>{description}</h2>
                  <p className="slider_date">{bottom_description}</p>
                </div>
                <img src={process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL+photo}/>
                </a>             
            </SwiperSlide>
          )}
      </Swiper>
 
        </div>
    )
}

export default Slider 