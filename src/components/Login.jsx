import React, { useContext } from 'react'
import Layout from './common/Layout'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { apiURL } from './common/http';
import { toast } from 'react-toastify';
import { UserAuthContext } from './UserAuth';

const Login = () => {

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

    const {login} = useContext(UserAuthContext);

    const navigate = useNavigate();


    const onSubmit = async (data) => {
    
            const res = await fetch(`${apiURL}/login`, {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status == 200) {
                    if (result.name === 'Admin') { 
                        toast.error("Tài khoản quản trị không được phép đăng nhập tại đây!");
                        return; 
                    }
                    const userInfo = {
                        token: result.token,
                        id: result.id,
                        name: result.name
                    }
    
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    login(userInfo)
                    navigate('/account')
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
                        <h2 className='border-bottom pb-2 mb-3'>ĐĂNG NHẬP</h2>
                        

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
                           Chưa có tài khoản? &nbsp;<Link to='/account/register'>Đăng ký</Link>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Login