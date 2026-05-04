import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiURL } from '../../common/http';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { formatVND } from '../../../utils/format';


const Shipping = () => {

    const [disable, setdisable] = useState(false)

    const { 
        register, 
        handleSubmit, 
        watch, 
        reset,
        formState: { errors } 
    } = useForm({
        defaultValues: async () => {
            await fetch(`${apiURL}/get-shipping`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    reset({
                        shipping_charge: result.data.shipping_charge
                    })
                } else {
                    console.log("Hệ thống gặp lỗi!");
                }                  
            })
        }
    });

    const saveShipping = async (data) =>{
            setdisable(true);
            const res = await fetch(`${apiURL}/save-shipping`,{
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(result => {
                setdisable(false)
                if (result.status == 200) {
                    toast.success(result.message);
                } else {
                    console.log("Hệ thống gặp lỗi!");
                }
                        
            })
    }



  return (
    <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Phí vận chuyển</h4>
                        
                    </div>

                    <div className='col-md-3'>
                        <Sidebar/>
                    </div>

                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveShipping)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>Phí vận chuyển</label>
                                        <div className="input-group">
                                            <input 
                                                {...register('shipping_charge',{
                                                    required : 'Chưa nhập số tiền!'
                                                })}
                                                type="number" 
                                                className={`form-control ${ errors.shipping_charge && 'is-invalid'}`}
                                                placeholder='Nhập số tiền'
                                            />
                                            <span className="input-group-text">VNĐ</span>
                                            
                                            {/* Nếu có lỗi thì hiển thị ở dưới cùng */}
                                            {errors.shipping_charge && 
                                                <div className='invalid-feedback d-block'>{errors.shipping_charge?.message}</div>
                                            }
                                        </div>
                                        {/* Gợi ý thêm: Hiện dòng chữ nhỏ bên dưới */}
                                        <small className="text-primary mt-1 d-block">
                                            {formatVND(watch('shipping_charge') || 0)}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={disable}
                                type='submit' className='btn btn-primary mt-3'>
                                Lưu
                            </button>
                        </form>                     
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shipping