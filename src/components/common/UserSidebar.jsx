import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../UserAuth';



const UserSidebar = () => {

    const {logout} = useContext(UserAuthContext);

  return (
     <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>   
                    <li>
                        <Link to="/account">Tài khoản</Link>
                    </li>
                    <li>
                        <Link to="/account/orders">Đơn hàng</Link>
                    </li>
                    <li>
                        <Link to="#">Đổi mật khẩu</Link>
                    </li>
                    <li>
                        <a href="#" onClick={logout}>Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
  )
}

export default UserSidebar