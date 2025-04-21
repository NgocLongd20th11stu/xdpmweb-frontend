import React from 'react'

const Footer = () => {
    return (
        <footer className='py-5 text-white'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 pb-4'>
                        <h4>Nhom 17</h4>
                        <p>Dang Ngoc Long</p>
                        <p >Tran Minh Hieu</p>
                    </div>

                    <div className='col-md-3 pb-4'>
                        <h3 className='mb-3'>DANH MỤC SẢN PHẨM</h3>
                        <ul>
                            <li>
                            <a>Áo thun</a>
                            </li>
                            <li>
                            <a>Áo khoác</a>
                            </li>
                            <li>
                            <a>Quần</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col-md-3 pb-4'>
                        <h3 className='mb-3'>LIÊN KẾT</h3>
                        <ul>
                            <li>
                            <a href="#">Đăng nhập</a>
                            </li>
                            <li>
                            <a href="#">Đăng ký</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3 pb-4'>
                        <h3 className='mb-3'>LIÊN HỆ VỚI CHÚNG TÔI</h3>
                        <ul>
                            <li>
                            <a>Sđt: 0909 123 456</a>
                            </li>
                            <li>
                            <a>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Hồ Chí Minh </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row spotlight py-5'>
                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center'>
                            <h3>Miễn phí giao hàng</h3>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center'>
                            <h3>Bảo đảm chất lượng</h3>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='d-flex justify-content-center'>
                            <h3>Đổi sản phẩm mới nếu sản phẩm lỗi</h3>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 text-center pt-3'>
                        <p>Copyright © 2025 nhom17. Powered by Haravan</p>
                    </div>
                </div>
            </div>
        </footer>
    ) 
}

export default Footer