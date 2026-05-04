import React, { useState } from 'react'
import Layout from './common/Layout'
import Sidebar from './common/Sidebar'
import { Link } from 'react-router-dom'
import UserSidebar from './common/UserSidebar'
import { useForm } from 'react-hook-form';
import { apiURL, userToken } from './common/http'
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';


const Profile = () => {

    const [loading, setLoading] = useState(true)

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: async () => {
            fetch(`${apiURL}/get-profile-details`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                setLoading(false)
                reset({
                    name: result.data.name,
                    email: result.data.email,
                    mobile: result.data.mobile,
                    address: result.data.address,
                    city: result.data.city,
                    state: result.data.state,
                    zip: result.data.zip
                })
            })
        }
    });

    const updateAccount = async (data) => {
        fetch(`${apiURL}/update-profile`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                if(result.status == 200) {
                    toast.success(result.message);
                } else {
                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach((field) => {
                        setError(field, {message: formErrors[field][0]});
                    })
                }
            });
    }



  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='d-flex justify-content-between mt-5 pb-3'>
                    <h4 className='h4 pb-0 mb-0'>Tài khoản</h4>
                    {/* <Link to="" className='btn btn-primary'>Button</Link> */}
                </div>

                <div className='col-md-3'>
                    <UserSidebar/>
                </div>

                <div className='col-md-9'>
                    {
                        loading == true && <Loader/>
                    }
                    {
                        loading == false &&
                        <form onSubmit={handleSubmit(updateAccount)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>

                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='name' className='form-label'>Tài khoản</label>
                                            <input 
                                            {
                                                ...register('name',{
                                                    required : "Chưa nhập tên tài khoản!"
                                                })
                                            }
                                            type='text' 
                                            id='name' 
                                            className={`form-control ${errors.name && 'is-invalid'}`} 
                                            placeholder='Nhập tên tài khoản'/>
                                            {
                                                errors.name && <p className='text-danger'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='email' className='form-label'>Email</label>
                                            <input
                                            {
                                                ...register('email',{
                                                    required : "Chưa nhập email!",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Email không hợp lệ !"
                                                    }                 
                                                })
                                            }
                                            type='text' 
                                            id='email' 
                                            className={`form-control ${errors.email && 'is-invalid'}`} 
                                            placeholder='Nhập email'/>
                                            {
                                                errors.email && <p className='text-danger'>{errors.email?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3'>
                                            <label htmlFor='address' className='form-label'>Địa chỉ</label>
                                            <textarea
                                            {
                                                ...register('address',{
                                                    required : "Chưa nhập địa chỉ!"
                                                })
                                            } 
                                            id='address' 
                                            placeholder='Nhập địa chỉ' 
                                            className={`form-control ${errors.address && 'is-invalid'}`} ></textarea>
                                            {
                                                errors.address && <p className='text-danger'>{errors.address?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='mobile' className='form-label'>Số điện thoại</label>
                                            <input
                                            {
                                                ...register('mobile',{
                                                    required : "Chưa nhập số điện thoại!"
                                                })
                                            }
                                            type='text' 
                                            id='mobile' 
                                            className={`form-control ${errors.mobile && 'is-invalid'}`}  
                                            placeholder='Nhập số điện thoại'/>
                                            {
                                                errors.mobile && <p className='text-danger'>{errors.mobile?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='city' className='form-label'>Thành phố</label>
                                            <input
                                            {
                                                ...register('city',{
                                                    required : "Chưa nhập tỉnh, thành phố!"
                                                })
                                            }
                                            type='text' 
                                            id='city' 
                                            className={`form-control ${errors.city && 'is-invalid'}`} 
                                            placeholder='Nhập tỉnh, thành phó'/>
                                            {
                                                errors.city && <p className='text-danger'>{errors.city?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='state' className='form-label'>Phường</label>
                                            <input
                                            {
                                                ...register('state',{
                                                    required : "Chưa nhập phường!"
                                                })
                                            }
                                            type='text' 
                                            id='state' 
                                            className={`form-control ${errors.state && 'is-invalid'}`} 
                                            placeholder='Nhập tên phường'/>
                                            {
                                                errors.state && <p className='text-danger'>{errors.state?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor='zip' className='form-label'>Mã bưu điện</label>
                                            <input
                                            {
                                                ...register('zip',{
                                                    required : "Chưa nhập mã bưu điện!"
                                                })
                                            }
                                            type='text' 
                                            id='zip' 
                                            className={`form-control ${errors.zip && 'is-invalid'}`} 
                                            placeholder='Nhập mã bưu điện'/>
                                            {
                                                errors.zip && <p className='text-danger'>{errors.zip?.message}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-primary my-3'>Cập nhật</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile