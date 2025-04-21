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
                        <a href="">Quản trị</a>
                    </li>
                    <li>
                        <Link to="/admin/categories">Danh mục sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands">Thương hiệu</Link>
                    </li>
                    <li>
                        <a href="">Sản phẩm</a>
                    </li>
                    <li>
                        <a href="">Đơn hàng</a>
                    </li>
                    <li>
                        <a href="">Tài khoản</a>
                    </li>
                    <li>
                        <a href="">Giao hàng</a>
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