import React, { useContext } from 'react'
import { AdminAuthContext } from '../AdminAuth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useContext(AdminAuthContext);

  return (
        <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>
                    <li>
                        <Link to={'/admin/dashboard'}>Quản trị</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories">Danh mục sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands">Thương hiệu</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to={'/admin/orders'}>Đơn hàng</Link>
                    </li>
                    <li>
                        <Link to={'/admin/profile'} >Tài khoản</Link>
                    </li>
                    <li>
                        <Link to={'/admin/shipping'} >Phí vận chuyển</Link>
                    </li>
                    <li>
                        <Link to={'/admin/customer'} >Khách hàng</Link>
                    </li>
                    <li>
                        <a href="">Thay đổi mật khẩu</a>
                    </li>
                    <li>
                        <a href="#" onClick={logout}>Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
  )
}

export default Sidebar