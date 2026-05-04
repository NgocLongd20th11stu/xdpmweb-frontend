import React, { useContext, useState } from 'react'
import Layout from '../common/Layout';
import { useForm } from "react-hook-form";
import { apiURL } from '../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../AdminAuth';

const Login = () => {
    const {login} = useContext(AdminAuthContext);

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const res = await fetch(`${apiURL}/admin/login`, {
            method : 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            console.log(result)

            if (result.status == 200) {
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }

                localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
                login(adminInfo)
                navigate('/admin/dashboard')
            } else {
                toast.error(result.message);
            }
        })
    }
  return (
    <Layout>
        <div className='container d-flex justify-content-center py-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card shadow border-0 login'>
                    <div className='card-body p-4'>
                        <h2>ĐĂNG NHẬP</h2>
                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Email:</label>
                            <input 
                                {
                                    ...register('email',{
                                        required: "Bạn chưa nhập email!",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Email không hợp lệ !"
                                        } 
                                    })
                                }
                                type="text" 
                                className={`form-control ${ errors.email && 'is-invalid'}`} 
                                placeholder='Nhập email'/>
                                {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Mật khẩu:</label>
                            <input
                            {
                                ...register("password", {
                                    required: "Bạn chưa nhập mật khẩu!"
                                })
                            }
                             type="password" 
                             className={`form-control ${ errors.password && 'is-invalid'}`} 
                             placeholder='Nhập mật khẩu'/>
                            {
                                errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                            }
                        </div>

                        <button className='btn btn-secondary w-100'>Đăng nhập</button>
                        <div className='d-flex justify-content-center pt-4 pb-2'>
                           Khách hàng đăng nhập  &nbsp;<Link to='/account/login'>tại đây</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Login