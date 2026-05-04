import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiURL, userToken } from './common/http';

const VNPayReturn = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Lấy mã đơn hàng từ tham số vnp_TxnRef của VNPay
        const orderId = searchParams.get('vnp_TxnRef');
        const responseCode = searchParams.get('vnp_ResponseCode');

        // 2. Gửi dữ liệu về Server để kiểm tra bảo mật và cập nhật DB
        const verifyPayment = async () => {
            try {
                const response = await fetch(`${apiURL}/vnpay-verify`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken()}`
                    },
                    body: JSON.stringify(Object.fromEntries([...searchParams]))
                });
                
                const result = await response.json();

                if (result.status === 'success' && responseCode === '00') {
                    // Thanh toán thành công -> Về trang Confirmation với ID tương ứng
                    navigate(`/order/confirmation/${orderId}`);
                } else {
                    // Thanh toán lỗi hoặc chữ ký sai -> Về trang chủ hoặc Checkout
                    alert("Thanh toán không thành công!");
                    navigate('/checkout');
                }
            } catch (error) {
                console.error("Lỗi xác thực VNPay:", error);
                navigate('/');
            }
        };

        if (orderId) {
            verifyPayment();
        }
    }, [searchParams, navigate]);

    return (
        <div className="text-center py-5">
            <h3>Đang xác thực giao dịch, vui lòng đợi...</h3>
        </div>
    );
};

export default VNPayReturn;