import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SliderOneImg from '../../assest/banner/banner1.png';
import SliderTwoImg from '../../assest/banner/banner2.png';


// Phần giới thiệu (Banner,...)
const Hero = () => {
    return (
        <section className='section-1'>
            <Swiper
            spaceBetween={0}
            slidesPerView={1}          
            breakpoints={{
                1024: {
                slidesPerView: 1,
                spaceBetween: 0,
                }
            }}
            >               
            <SwiperSlide>
                <div className="content" style={{ backgroundImage: `url(${SliderOneImg})` }}>                        
                </div>                   
            </SwiperSlide>
            <SwiperSlide>
                <div className="content" style={{ backgroundImage: `url(${SliderTwoImg})` }}>                        
                </div>
            </SwiperSlide>                
            </Swiper>
        </section>
    )
}
export default Hero