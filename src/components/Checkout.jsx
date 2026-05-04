import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'


import { CartContext } from './context/Cart';
import { formatVND } from '../utils/format';
import { useForm } from 'react-hook-form';
import { apiURL, userToken } from './common/http';
import { toast } from 'react-toastify';



const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const {cartData, grandTotal, subTotal, shipping} = useContext(CartContext);
    const navigate = useNavigate();


    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            fetch(`${apiURL}/get-profile-details`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                reset({
                    name: result.data.name,
                    email: result.data.email,
                    mobile: result.data.mobile,
                    address: result.data.address,
                    city: result.data.city,
                    state: result.data.state,
                    zip: result.data.zip
                })
            })
        }
    });

    const processOrder = (data) => {
        // Dù chọn gì cũng gọi saveOrder, chỉ khác nhau cái trạng thái thanh toán ban đầu
        const status = (paymentMethod === 'vnpay') ? 'not paid' : 'not paid'; 
        saveOrder(data, status);
    }

    const saveOrder = (formData, paymentStatus) => {
        const newFormData = {...formData,
                                grand_total: grandTotal(), 
                                sub_total: subTotal(), 
                                shipping: shipping(),
                                discount: 0,
                                payment_status: paymentStatus,
                                status: 'pending',
                                cart: cartData
                            }
        fetch(`${apiURL}/save-order`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            },
            body: JSON.stringify(newFormData)
        })
        .then(res => res.json())
        .then(result => {
            if (result.status == 200) {
                // Xóa giỏ hàng sau khi lưu đơn hàng thành công
                localStorage.removeItem('cart');

                // KIỂM TRA PHƯƠNG THỨC THANH TOÁN TẠI ĐÂY
                if (paymentMethod === 'vnpay') {
                    // Nếu là VNPay, gọi hàm lấy link thanh toán (truyền ID vừa tạo và tổng tiền)
                    getVNPayUrl(result.id, newFormData.grand_total);
                } else {
                    // Nếu là COD, điều hướng thẳng đến trang xác nhận như cũ
                    navigate(`/order/confirmation/${result.id}`);
                }
            } else {
                    toast.error(result.message)
            }
        })
    }

    const getVNPayUrl = (orderId, amount) => {
    fetch(`${apiURL}/vnpay-payment`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken()}`
        },
        body: JSON.stringify({
            order_id: orderId,
            amount: amount
        })
    })
    .then(res => res.json())
    .then(result => {
        if (result.status === 'success') {
            // Chuyển hướng sang trang VNPay Sandbox
            window.location.href = result.data;
        } else {
            toast.error("Không thể khởi tạo thanh toán VNPay");
        }
    });
}


  return (
    <Layout>
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <nav aria-label="breadcrumb" className='py-4'>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>                           
                            <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* FORM NHẬP THÔNG TIN */}
            <form onSubmit={handleSubmit(processOrder)}>
                <div className='row'>
                    
                        <div className='col-md-7'>
                            <h3 className='border-bottom pb-3'>Thông tin đặt hàng</h3>
                            
                                <div className='row pt-3'>
                                    <div className='col-md-6'>
                                    {/* HỌ TÊN */}
                                        <div className='mb-3'>
                                            <input
                                                {
                                                    ...register('name',{
                                                        required : "Chưa nhập họ tên!"
                                                    })
                                                } 
                                                type="text" 
                                                className={`form-control ${errors.name && 'is-invalid'}`}
                                                placeholder='Họ tên' />
                                                {
                                                    errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                                }
                                            
                                        </div>
                                    </div>

                                    {/* EMAIL */}
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('email',{
                                                    required : "Chưa nhập email!",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Email không hợp lệ !"
                                                    }                 
                                                })
                                            } 
                                            type="text" 
                                            className={`form-control ${errors.email && 'is-invalid'}`}
                                            placeholder='Email'/>
                                            {
                                                errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    {/* ĐỊA CHỈ */}
                                    <div className='mb-3'>
                                        <textarea
                                            {
                                                ...register('address',{
                                                        required : "Chưa nhập địa chỉ!"
                                                })
                                            } 
                                            className={`form-control ${errors.address && 'is-invalid'}`} 
                                            rows={3} 
                                            placeholder='Địa chỉ'>
                                        </textarea>
                                        {
                                            errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                        }
                                    </div>

                                    {/* THÀNH PHỐ */}
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input
                                            {
                                                ...register('city',{
                                                    required : "Chưa nhập thành phố!"
                                                })
                                            } 
                                            type="text" 
                                            className={`form-control ${errors.city && 'is-invalid'}`}  
                                            placeholder='Thành phố'/>
                                            {
                                                errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    {/* QUẬN/HUYỆN */}
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input
                                            {
                                                ...register('state',{
                                                    required : "Chưa nhập tên phường!"
                                                })
                                            } 
                                            type="text" 
                                            className={`form-control ${errors.state && 'is-invalid'}`}  
                                            placeholder='Phường'/>
                                            {
                                                errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    {/* MÃ BƯU ĐIỆN */}
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input
                                            {
                                                ...register('zip',{
                                                    required : "Chưa nhập mã bưu điện!"
                                                })
                                            } 
                                            type="text" 
                                            className={`form-control ${errors.zip && 'is-invalid'}`}  
                                            placeholder='Mã bưu điện'/>
                                            {
                                                errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    {/* SĐT */}
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input
                                            {
                                                ...register('mobile',{
                                                    required : "Chưa nhập số điện thoại!"
                                                })
                                            }
                                            type="text" 
                                            className={`form-control ${errors.mobile && 'is-invalid'}`}   
                                            placeholder='Số điện thoại'/>
                                            {
                                                errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                            }
                                        </div>
                                    </div>
                                </div>

                        </div>
                        <div className='col-md-5'>
                            <h3 className='border-bottom pb-3'>Sản phẩm</h3>
                            <table className='table'>
                                <tbody>
                                    {
                                        cartData && cartData.map(item => {
                                            return (
                                                <tr key={`cart-${item.id}`}>
                                                    <td width={100}>
                                                        <img src={item.image_url} width={80} alt=""/>
                                                    </td>
                                                    <td width={600}>
                                                        <h4>Product</h4>
                                                        <div className='d-flex align-items-center pt-3'>          
                                                            <span>{formatVND(item.price)}</span>
                                                            <div className='ps-3'>
                                                                {
                                                                    item.size && <button className='btn btn-size'>{item.size}</button>
                                                                }
                                                            </div>
                                                            <div className='ps-5'>X {item.quantity}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>                  
                            </table>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='d-flex justify-content-between border-bottom pb-2'>
                                        <div>Tạm tính:</div>
                                        <div>{formatVND(subTotal())}</div>
                                    </div>

                                    <div className='d-flex justify-content-between border-bottom py-2'>
                                        <div>Phí giao hàng</div>
                                        <div>{formatVND(shipping())}</div>
                                    </div>

                                    <div className='d-flex justify-content-between border-bottom py-2'>
                                        <div>Tổng cộng</div>
                                        <div>{formatVND(grandTotal())}</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className='border-bottom pt-4 pb-3'>Phương thức thanh toán</h3>
                            <div className='pt-2'>
                                <input type="radio"
                                onClick={handlePaymentMethod} 
                                defaultChecked={paymentMethod == 'vnpay'} value={'vnpay'}/>
                                <label htmlFor="" className='form-label ps-2'>VNPay</label>

                                <input type="radio" 
                                onClick={handlePaymentMethod} 
                                defaultChecked={paymentMethod == 'cod'} value={'cod'} className='ms-3'/>
                                <label htmlFor="" className='form-label ps-2'>Tiền mặt</label>
                            </div>
                            <div className='d-flex py-3'>
                                <button className='btn btn-primary'>Đặt hàng</button>
                            </div>
                        </div>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Checkout