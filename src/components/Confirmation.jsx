import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { apiURL, userToken } from './common/http';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatVND } from '../utils/format';

const Confirmation = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const params = useParams();

    const fetchOrder = () => {
        fetch(`${apiURL}/get-order-details/${params.id}`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setLoading(false)
            if(result.status==200){
                setOrder(result.data)
                setItems(result.data.items)
            } 
        });
    }

    useEffect(() => {
        fetchOrder();
    },[])


  return (
    <Layout>
        <div className='container py-5'>
            {
                loading == true &&
                <div className='text-center py-5'>
                    <div className='spinner-border' role='status'>
                        <span className='visually-hidden'>loading...</span>
                    </div>
                </div>
            }

            {
                loading === false && order &&
                <div>
                    <div className='row'>
                        <h1 className='text-center fw-bold text-success'>Đặt hàng Thành Công</h1>
                    </div>

                    <div className='card shadow'>
                        <div className='card-body'>
                            <h3 className='fw-bold'>Thông tin đơn hàng</h3>
                            <hr/>

                            <div className='row'>
                                <div className='col-6'>
                                    <p><strong>Mã đơn hàng: </strong>#{order.id}</p>
                                    <p><strong>Thời gian đặt hàng: </strong>{order.created_at}</p>
                                    <p><strong>Trạng thái: </strong>
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
                                            order.status == 'processing' && <span className='badge bg-primary'>Đang chuẩn bị hàng</span>
                                        }
                                        
                                    </p>
                                    <p>
                                        <strong>Hình thức thanh toán: </strong>
                                        {order.payment_method === 'vnpay' ? 'Thanh toán qua VNPay' : 'Thanh toán khi nhận hàng (COD)'}
                                    </p>
                                </div>

                                <div className='col-6'>
                                    <p><strong>Khách hàng: </strong>{order.name}</p>
                                    <p><strong>Địa chỉ: </strong>{order.address}, {order.city}, {order.state}, {order.zip}</p>
                                    <p><strong>Số điện thoại: </strong>{order.mobile}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12'>
                                    <table className='table-striped table-bordered table'>
                                        <thead className='table-light'>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th width="150">Số tiền</th>
                                                <th width="150">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                items.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{formatVND(item.unit_price)}</td>
                                                        <td>{formatVND(item.price)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className='text-end fw-bold' colSpan={3}>Tạm tính:</td>
                                                <td>{formatVND(order.subtotal)}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-end fw-bold' colSpan={3}>Phí vận chuyển:</td>
                                                <td>{formatVND(order.shipping)}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-end fw-bold' colSpan={3}>Tổng cộng:</td>
                                                <td>{formatVND(order.grand_total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table> 
                                </div>

                                <div className='text-center'>
                                    <button className='btn btn-primary'>Xem đơn hàng</button>
                                    <Link to={'/'} className='btn btn-outline-secondary ms-2'>Tiếp tục mua sắm</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                loading == false && !order &&
                <div className='row'>
                    <h1 className='text-center fw-bold text-muted'>Không Tìm Thấy Đơn Hàng</h1>
                </div>
            }
        </div>
    </Layout>
  )
}

export default Confirmation