import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'
import { adminToken, apiURL } from '../common/http';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  // 1. Khởi tạo state để chứa dữ liệu
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0
  });

  // 2. Hàm gọi API
  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiURL}/admin-dashboard`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });
      const result = await res.json();
      if (result.status === 200) {
        setStats({
          users: result.users,
          orders: result.orders,
          products: result.products
        });
      }
    } catch (error) {
      console.error("Lỗi khi load thống kê:", error);
    }
  };

  // 3. Gọi hàm fetchStats khi component mount
  useEffect(() => {
    fetchStats();
  }, []);
  
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Trang quản trị</h4>
          </div>

          <div className='col-md-3'>
            <Sidebar/>
          </div>

          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2 className='text-primary'>{stats.users}</h2>
                    <span>Tài khoản khách hàng</span>
                  </div>
                  <div className='card-footer'>
                    <Link to={'/admin/customer'} >Danh sách khách hàng</Link>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2 className='text-success'>{stats.orders}</h2>
                    <span>Đơn hàng</span>
                  </div>
                  <div className='card-footer'>
                    <Link to={'/admin/orders'}>Danh sách đơn hàng</Link>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='card shadow'>
                  <div className='card-body'>
                    <h2 className='text-warning'>{stats.products}</h2>
                    <span>Sản phẩm</span>
                  </div>
                  <div className='card-footer'>
                    <Link to="/admin/products">Danh sách sản phẩm</Link>
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

export default Dashboard