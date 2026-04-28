import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import UserSidebar from '../common/UserSidebar'
import { apiURL, userToken } from '../common/http';
import Loader from '../common/Loader';
import Nostate from '../common/Nostate';
import { Link } from 'react-router-dom';
import { formatVND } from '../../utils/format';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loader, setloader] = useState(false);

    const fetchOrders = async () => {
        setloader(true)
        const res = await fetch(`${apiURL}/get-orders`,{
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
                setOrders(result.data);
            } else {
                console.log("Hệ thống gặp lỗi!");
            }
                    
        })
    }
        
        useEffect(() => {
            fetchOrders();
        },[])


  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='d-flex justify-content-between mt-5 pb-3'>
                    <h4 className='h4 pb-0 mb-0'>Đơn hàng</h4>
                    {/* <Link to="" className='btn btn-primary'>Button</Link> */}
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
                                loader == false && orders.length == 0 && <Nostate text="Không có đơn hàng!"/>
                            }

                            {
                                orders && orders.length > 0 &&
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th>Khách hàng</th>
                                            <th>Email</th>
                                            <th>Tổng tiền</th>
                                            <th>Thời gian đặt hàng</th>
                                            <th>Thanh toán</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order) => {
                                                return (
                                                    <tr key={`order-${order.id}`}>
                                                        <td>
                                                            <Link to={`/account/orders/details/${order.id}`}>{order.id}</Link>
                                                        </td>
                                                        <td>{order.name}</td>
                                                        <td>{order.email}</td>
                                                        <td>{formatVND(order.grand_total)}</td>
                                                        <td>{order.created_at}</td>
                                                        <td>
                                                            {
                                                                order.payment_status == 'paid' ?
                                                                <span className='badge bg-success'>Đã thanh toán</span> :
                                                                <span className='badge bg-danger'>Chưa thanh toán</span>
                                                            }
                                                        </td>
                                                        <td>
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
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default MyOrders