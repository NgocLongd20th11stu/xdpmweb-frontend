import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminToken ,apiURL } from '../../common/http'
import { toast } from 'react-toastify'
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';

const Edit = () => {

  const [disable, setdisable] = useState(false);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { 
    register, 
    handleSubmit, 
    watch, 
    reset,
    formState: { errors } 
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiURL}/brands/${params.id}`,{
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`
        }
    
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.status == 200) {
          setBrand(result.data)          
        } else {
          console.log("Hệ thống gặp lỗi!");
        }  
      })
    }
  });

  const saveBrand = async (data) =>{
    setdisable(true);
    const res = await fetch(`${apiURL}/brands/${params.id}`,{
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      setdisable(false)
      if (result.status == 200) {
        toast.success(result.message);
        navigate('/admin/brands')
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
            <h4 className='h4 pb-0 mb-0'>Thương hiệu / Cập nhật</h4>
            <Link to="/admin/brands" className='btn btn-primary'>Trở lại</Link>
          </div>

          <div className='col-md-3'>
            <Sidebar/>
          </div>

          <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveBrand)}>
              <div className='card shadow'>
                <div className='card-body p-4'>
                  <div className='mb-3'>
                    <label htmlFor="" className='form-label'>
                      Tên thương hiệu
                    </label>
                    <input 
                      {
                        ...register('name',{
                          required : 'Chưa nhập tên thương hiệu!'
                        })
                      }
                      type="text" 
                      className={`form-control ${ errors.name && 'is-invalid'}`}
                      placeholder='Tên thương hiệu'
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
                Cập nhật
              </button>
            </form>                         
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit