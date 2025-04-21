import React, { useState } from 'react'
import Layout from './common/Layout';
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import ProductImg from '../assest/products/t-shirt/naturalReserve.png';
import ProductImg1 from '../assest/products/t-shirt/naturalReserve1.png';
import ProductImg2 from '../assest/products/t-shirt/naturalReserve2.png';


const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4)
  return (
    <Layout>
        <div className='container product-detail'>
            <div className='row'>
                <div className='col-md-12'>
                    <nav aria-label="breadcrumb" className='py-4'>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li class="breadcrumb-item" aria-current="page"><Link to="/shop">Cửa hàng</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Sản phẩm</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className='row mb-5'>
                <div className='col-md-5'>
                    <div className='row'>
                        <div className='col-2'>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#000',
                                    '--swiper-pagination-color': '#000',
                                }}
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                direction={`vertical`}
                                spaceBetween={10}
                                slidesPerView={6}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper mt-2"
                            >           
                                <SwiperSlide>
                                    <div className='content'>
                                        <img 
                                            src={ProductImg} 
                                            alt="" 
                                            height={100}
                                            className='w-100' />
                                    </div>                                                                      
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='content'>
                                        <img 
                                            src={ProductImg1} 
                                            alt="" 
                                            height={100}
                                            className='w-100' />
                                    </div>                                                                      
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='content'>
                                        <img 
                                            src={ProductImg2} 
                                            alt="" 
                                            height={100}
                                            className='w-100' />
                                    </div>                                                                      
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <div className='col-10'>
                            <Swiper
                                style={{
                                '--swiper-navigation-color': '#000',
                                '--swiper-pagination-color': '#000',
                                }}
                                loop={true}
                                spaceBetween={0}
                                navigation={true}
                                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >           
                                <SwiperSlide >
                                    <div className='content'>
                                    <img 
                                        src={ProductImg} 
                                        alt="" 
                                        className='w-100' />
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide >
                                    <div className='content'>
                                    <img 
                                        src={ProductImg1} 
                                        alt="" 
                                        className='w-100' />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <div className='content'>
                                    <img 
                                        src={ProductImg2} 
                                        alt="" 
                                        className='w-100' />
                                    </div>
                                </SwiperSlide>          
                            </Swiper>
                        </div>
                    </div>
                </div>

                <div className='col-md-7'>
                    <h2>Product</h2>
                    <div className='d-flex'>
                        <Rating
                            size={20}
                            readonly
                            initialValue={rating}
                        />
                        <span className='pt-1 ps-2'>50 bình luận</span>
                    </div>

                    <div className='price h3 py-3'>
                        300.000 VNĐ <span className='text-decoration-line-through'>450.000VNĐ</span>
                    </div>
                    <div>
                        Áo thun bằng cotton jersey hơi nặng có hoạ tiết in, cổ tròn, viền gân nổi, vai ráp trễ và vạt ngang.
                        Dáng rộng để mặc thoải mái nhưng không bị thụng.
                    </div>

                    <div className='pt-3'>
                        <strong>Size</strong>
                        <div className='sizes pt-2'>
                            <button className='btn btn-size ms-1'>S</button>
                            <button className='btn btn-size ms-1'>M</button>
                            <button className='btn btn-size ms-1'>L</button>
                        </div>
                    </div>

                    <div className='add-to-cart my-4'>
                        <button className='btn btn-primary text-uppercase '>Thêm giỏ hàng</button>
                    </div>
               
                </div>
            </div>

            <div className='row pb-5'>
                <div className='col-md-12'>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Mô tả">
                            Mô tả
                        </Tab>
                        <Tab eventKey="profile" title="Chất liệu">
                            Chất liệu
                        </Tab>
                    </Tabs>                              
                </div>             

            </div>
        </div>
    </Layout>
  )
}

export default Product