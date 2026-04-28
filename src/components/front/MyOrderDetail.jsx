import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import { Link, useParams } from 'react-router-dom'
import UserSidebar from '../common/UserSidebar'
import Loader from '../common/Loader'
import { apiURL, userToken } from '../common/http'
import { formatVND } from '../../utils/format'

const MyOrderDetail = () => {

    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const [loader, setloader] = useState(false);
    const params = useParams();

    const fetchOrder = async () => {
        setloader(true)
        const res = await fetch(`${apiURL}/get-order-details/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setloader(false)
            if (result.status == 200) {
                setOrder(result.data);
                setItems(result.data.items);
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
                    <h4 className='h4 pb-0 mb-0'>Tài khoản</h4>
                    {/* <Link to="" className='btn btn-primary'>Quay lại</Link> */}
                </div>

                <div className='col-md-3'>
                    <UserSidebar/>
                </div>

                <div className='col-md-9'>
                    <div className='card shadow'>
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
            </div>
        </div>
    </Layout>
  )
}

export default MyOrderDetail