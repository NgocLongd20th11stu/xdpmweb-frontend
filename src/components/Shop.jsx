import React from 'react'
import Layout from './common/Layout'
import ProductImg1 from '../assest/products/t-shirt/naturalReserve.png';
import ProductImg2 from '../assest/products/t-shirt/aothun_OversizedFit.png';
import { Link } from 'react-router-dom';



const Shop = () => {
  return (
    
    <Layout>
      <div className='container'>
        <nav aria-label="breadcrumb" className='py-4'>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">Cửa hàng</li>
          </ol>
        </nav>

        <div className='row'>
          <div className='col-md-3'>
              <div className='card shadow border-0 mb-3'>
                <div className='card-body p-4'>
                  <h3 className='mb-3'>Danh mục sản phẩm</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Áo thun</label>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Áo khoác</label>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>Quần</label>
                    </li>
                  </ul>

                </div>
              </div>

              <div className='card shadow border-0 mb-3'>
                <div className='card-body p-4'>
                  <h3 className='mb-3'>Thương hiệu</h3>
                  <ul>
                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>TSUN</label>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>SWE</label>
                    </li>

                    <li className='mb-2'>
                      <input type="checkbox"/>
                      <label htmlFor="" className='ps-2'>HighClub</label>
                    </li>
                  </ul>

                </div>
              </div>
          </div>

          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-4 col-6'>
                <div className='product card border-0'>
                  <div className='card-img'> 
                    <Link to="/product">
                      <img src={ProductImg1} alt="" className='w-100'/>
                    </Link>                
                  </div>
                  <div className='card-body pt-3'>
                    <Link to="/product">Áo thun Natural Reserve</Link>
                    <div className='price'>
                      300.000 VND <span className='text-decoration-line-through'>450.000VND</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-4 col-6'>
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

              <div className='col-md-4 col-6'>
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

              <div className='col-md-4 col-6'>
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
        </div>
      </div>
    </Layout>
  )
}

export default Shop