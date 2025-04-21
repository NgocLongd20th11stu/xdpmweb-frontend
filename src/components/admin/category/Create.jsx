import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../common/Layout'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken ,apiURL } from '../../common/http'


const Create = () => {
    const [disable, setdisable] = useState(false);
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
         watch, 
        formState: { errors } 
    } = useForm();

    const saveCategory = async (data) =>{
        setdisable(true);
        console.log(data)
        const res = await fetch(`${apiURL}/categories`,{
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
                navigate('/admin/categories')
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
                        <h4 className='h4 pb-0 mb-0'>Danh mục sản phẩm / Tạo mới</h4>
                        <Link to="/admin/categories" className='btn btn-primary'>Trở lại</Link>
                    </div>

                    <div className='col-md-3'>
                        <Sidebar/>
                    </div>

                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveCategory)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Tên danh mục
                                        </label>
                                        <input 
                                            {
                                                ...register('name',{
                                                    required : 'Chưa nhập tên danh mục sản phẩm!'
                                                })
                                            }
                                            type="text" 
                                            className={`form-control ${ errors.name && 'is-invalid'}`}
                                            placeholder='Tên danh mục'
                                        />
                                        {
                                            errors.name && 
                                            <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Trạng thái
                                        </label>
                                        <select 
                                            {
                                                ...register('status',{
                                                    required : 'Chưa chọn trạng thái!'
                                                })
                                            }
                                            className={`form-control ${ errors.name && 'is-invalid'}`}>
                                            <option value="">Chọn trạng thái</option> 
                                            <option value="1">Hoạt động</option>
                                            <option value="0">Khóa</option>
                                        </select>
                                        {
                                            errors.status && 
                                            <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={disable}
                                type='submit' className='btn btn-primary mt-3'>
                                Tạo mới
                            </button>
                        </form>                     
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create