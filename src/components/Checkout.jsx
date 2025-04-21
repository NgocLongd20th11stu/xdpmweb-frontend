import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'

import ProductImg from '../assest/products/t-shirt/naturalReserve.png';



const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
  return (
    <Layout>
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <nav aria-label="breadcrumb" className='py-4'>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Trang chủ</Link></li>                           
                            <li class="breadcrumb-item active" aria-current="page">Thanh toán</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    <h3 className='border-bottom pb-3'>Thông tin nhận hàng</h3>
                    <form action="">
                        <div className='row pt-3'>
                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" className='form-control' placeholder='Họ tên'/>
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" className='form-control' placeholder='Email'/>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <textarea className='form-control' rows={3} placeholder='Địa chỉ'></textarea>
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" className='form-control' placeholder='Thành phố'/>
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" className='form-control' placeholder='Số điện thoại'/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-md-5'>
                    <h3 className='border-bottom pb-3'>Sản phẩm</h3>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td width={100}>
                                    <img src={ProductImg} width={80} alt=""/>
                                </td>
                                <td width={600}>
                                    <h4>Product</h4>
                                    <div className='d-flex align-items-center pt-3'>          
                                        <span>300.000VNĐ</span>
                                        <div className='ps-3'>
                                            <button className='btn btn-size ms-1'>S</button>
                                        </div>
                                        <div className='ps-5'>X 1</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>                  
                    </table>

                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-between border-bottom pb-2'>
                                <div>Tạm tính:</div>
                                <div>300.000 VNĐ</div>
                            </div>

                            <div className='d-flex justify-content-between border-bottom py-2'>
                                <div>Phí giao hàng</div>
                                <div>10.000 VNĐ</div>
                            </div>

                            <div className='d-flex justify-content-between border-bottom py-2'>
                                <div>Tổng cộng</div>
                                <div>310.000 VNĐ</div>
                            </div>
                        </div>
                    </div>

                    <h3 className='border-bottom pt-4 pb-3'>Phương thức thanh toán</h3>
                    <div className='pt-2'>
                        <input type="radio"
                        onClick={handlePaymentMethod} 
                        checked={paymentMethod == 'stripe'} value={'stripe'}/>
                        <label htmlFor="" className='form-label ps-2'>Stripe</label>

                        <input type="radio" 
                        onClick={handlePaymentMethod} 
                        checked={paymentMethod == 'cod'} value={'cod'} className='ms-3'/>
                        <label htmlFor="" className='form-label ps-2'>Tiền mặt</label>
                    </div>
                    <div className='d-flex py-3'>
                        <button className='btn btn-primary'>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Checkout