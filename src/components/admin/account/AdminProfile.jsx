import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import Loader from '../../common/Loader'
import { adminToken, apiURL } from '../../common/http'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



const AdminProfile = () => {


    const [loading, setLoading] = useState(true)

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: async () => {
            fetch(`${apiURL}/get-admin-profile-details`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                setLoading(false)
                reset({
                    name: result.data.name,
                    email: result.data.email,
                })
            })
        }
    });

    const updateAccount = async (data) => {
        fetch(`${apiURL}/update-admin-profile`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
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
                    <Sidebar/>
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
                                            <label htmlFor='name' className='form-label'>Tài khoản quản trị</label>
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

export default AdminProfile