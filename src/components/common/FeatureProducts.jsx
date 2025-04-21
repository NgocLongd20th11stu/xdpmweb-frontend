import React from 'react'
import ProductImg1 from '../../assest/products/t-shirt/naturalReserve.png';
import ProductImg2 from '../../assest/products/t-shirt/aothun_OversizedFit.png';


// Sản phẩm nổi bật
const FeatureProducts = () => {
  return (
    <section className='section-2 py-5'>
            <div className='container'>
                <h2>SẢN PHẨM NỔI BẬT</h2>
                <div className='row mt-4'>
                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'> 
                                <img src={ProductImg1} alt="" className='w-100'/>
                            </div>
                            <div className='card-body pt-3'>
                                <a href="">Áo thun Natural Reserve</a>
                                <div className='price'>
                                    300.000 VND <span className='text-decoration-line-through'>450.000VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className='col-md-3 col-6'>
                        <div className='product card border-0'>
                            <div className='card-img'> 
                                <img src={ProductImg2} alt="" className='w-100'/>
                            </div>
                            <div className='card-body pt-3'>
                                <a href="">Áo thun So Fresh So Clean</a>
                                <div className='price'>
                                    250.000 VND <span className='text-decoration-line-through'>450.000VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </section>
  )
}

export default FeatureProducts