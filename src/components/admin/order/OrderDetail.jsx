import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { data, Link, useFormAction, useParams } from 'react-router-dom'
import { adminToken, apiURL } from '../../common/http'
import { formatVND } from '../../../utils/format'
import Loader from '../../common/Loader'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'


const OrderDetail = () => {

    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const [loader, setloader] = useState(false);
    const params = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const fetchOrder = async () => {
        setloader(true)
        const res = await fetch(`${apiURL}/orders/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setloader(false)
            if (result.status == 200) {
                setOrder(result.data);
                setItems(result.data.items);
                reset({
                    status: result.data.status,
                    payment_status: result.data.payment_status,
                })
            } else {
                console.log("Hệ thống gặp lỗi!");
            }
                    
        })
    }

    const updateOrder = async (data) => {
        setloader(true)
        const res = await fetch(`${apiURL}/update-order/${params.id}`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            setloader(false)
            if (result.status == 200) {
                setOrder(result.data);
                reset({
                    status: result.data.status,
                    payment_status: result.data.payment_status,
                })
                toast.success(result.message);
            } else {
                console.log("Hệ thống gặp lỗi!");
            }
                    
        })
    }
        
    useEffect(() => {
        fetchOrder();
    },[])


  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='d-flex justify-content-between mt-5 pb-3'>
                    <h4 className='h4 pb-0 mb-0'>Đơn hàng</h4>
                    <Link to="/admin/orders" className='btn btn-primary'>Quay lại</Link>
                </div>

                {/* SIDEBAR BÊN TRÁI */}
                <div className='col-md-3'>
                    <Sidebar/>
                </div>

                {/* SIDEBAR GIỮA */}
                <div className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <div className='card shadow mb-5'>
                                <div className='card-body p-4'>
                                    {
                                        loader == true && <Loader/>
                                    }

                                    {
                                        loader == false &&
                                        <div >
                                            {/* HÀNG THỨ 1 */}
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <h3>Mã đơn hàng: #{order.id}</h3>
                                                    {
                                                        order.status == 'pending' && <span className='badge bg-warning'>Chờ xác nhận</span>
                                                    }

                                                    {
                                                        order.status == 'shipped' && <span className='badge bg-warning'>Đang giao hàng</span>
                                                    }

                                                    {
                                                        order.status == 'delivered' && <span className='badge bg-success'>Đã giao hàng</span>
                                                    }

                                                    {
                                                        order.status == 'cancelled' && <span className='badge bg-danger'>Dã hủy</span>
                                                    }
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='text-secondary'>Thời gian đặt hàng</div>
                                                    <h4 className='pt-2'>{order.created_at}</h4>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='text-secondary'>Thanh toán</div>
                                                    {
                                                        order.payment_status == 'paid' ?
                                                        <span className='badge bg-success'>Đã thanh toán</span> :
                                                        <span className='badge bg-danger'>Chưa thanh toán</span>
                                                    }
                                                </div>
                                            </div>

                                            {/* HÀNG THỨ 2 */}
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='py-5'>
                                                        <strong>{order.name}</strong>
                                                        <div>{order.email}</div>
                                                        <div>{order.mobile}</div>
                                                        <div>{order.address}, {order.city} {order.state} {order.zip}</div>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div className='col-md-4'>
                                                    <div className='text-secondary pt-5'>Hình thức thanh toán</div>
                                                    <p>COD</p>
                                                </div>
                                            </div>

                                            {/* THÔNG TIN SẢN PHẨM */}
                                            <div className="row">
                                                <h3 className="pb-2 "><strong>Sản phẩm</strong></h3>
                                                {
                                                    items.map((item) => {
                                                        return (
                                                            <div key={`${item.id}`} className="row justify-content-end">
                                                                <div className="col-lg-12">
                                                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                        <div className="d-flex">
                                                                            {
                                                                                item.product.image && <img 
                                                                                    width="70" 
                                                                                    className="me-3" 
                                                                                    src={`${item.product.image_url}`} 
                                                                                    alt=""
                                                                                />
                                                                            }
                                                                            
                                                                            <div className="d-flex flex-column">
                                                                                <div className="mb-2"><span>{item.name}</span></div>
                                                                                <div><button className="btn btn-size">{item.size}</button></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <div>X {item.quantity}</div>
                                                                            <div className="ps-3">{formatVND(item.price)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                                <div className="row justify-content-end">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Thành tiền</div>
                                                            <div>{formatVND(order.subtotal)}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Vận chuyển</div>
                                                            <div>{formatVND(order.shipping)}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div><strong>Tổng cộng</strong></div>
                                                            <div>{formatVND(order.grand_total)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>


                        {/* SIDEBAR BÊN PHẢI-GIỮA */}
                        <div className='col-md-3'>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <form onSubmit={handleSubmit(updateOrder)}>
                                        <div className='mb-3'>
                                            <label className='form-label' htmlFor='status'>Trạng thái</label>
                                            <select
                                            {
                                                ...register('status', {required: true})
                                            }
                                            id='status' 
                                            className='form-select'>
                                                <option value={"pending"}>Chờ xác nhận</option>
                                                <option value={"shipped"}>Đang giao hàng</option>
                                                <option value={"delivered"}>Đã giao hàng</option>
                                                <option value={"cancelled"}>Đã hủy</option>
                                            </select>
                                        </div>

                                        <div className='mb-3'>
                                            <label className='form-label' htmlFor='payment-status'>Thanh toán</label>
                                            <select
                                            {
                                                ...register('payment_status', {required: true})
                                            }
                                            id='payment-status' className='form-select'>
                                                <option value={"paid"}>Đã thanh toán</option>
                                                <option value={"not paid"}>Chưa thanh toán</option>
                                            </select>
                                        </div>
                                        <button type='submit' className='btn btn-primary'>
                                            Cập nhật
                                        </button>
                                    </form>
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

export default OrderDetail