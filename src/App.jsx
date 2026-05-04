import { useState } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import {default as ShowCategories} from './components/admin/category/Show'
import {default as CreateCategory} from './components/admin/category/Create'
import {default as EditCategory} from './components/admin/category/Edit'

import {default as ShowBrands} from './components/admin/brand/Show'
import {default as CreateBrand} from './components/admin/brand/Create'
import {default as EditBrand} from './components/admin/brand/Edit'

import {default as ShowProducts} from './components/admin/product/Show'
import {default as CreateProduct} from './components/admin/product/Create'
import {default as EditProduct} from './components/admin/product/Edit'

import Register from './components/Register'
import {default as UserLogin} from './components/Login'
import Profile from './components/Profile'
import { UserRequireAuth } from './components/UserRequireAuth'
import Confirmation from './components/Confirmation'
import ShowOrders from './components/admin/order/ShowOrders'
import OrderDetail from './components/admin/order/OrderDetail'
import MyOrders from './components/front/MyOrders'
import MyOrderDetail from './components/front/MyOrderDetail'
import Shipping from './components/admin/shipping/Shipping'
import VNPayReturn from './components/VNPayReturn'
import AdminProfile from './components/admin/account/AdminProfile'
import CustomerList from './components/admin/customer/CustomerList'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*===================User Routes=====================*/}
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/account/register' element={<Register/>}/>
          <Route path='/account/login' element={<UserLogin/>}/>

          
          <Route path='/account' element={
            <UserRequireAuth>
              <Profile/>
            </UserRequireAuth>
          }/>

          <Route path='/account/orders' element={
            <UserRequireAuth>
              <MyOrders/>
            </UserRequireAuth>
          }/>

          <Route path='/checkout' element={
            <UserRequireAuth>
              <Checkout />
            </UserRequireAuth>
          }/>

          <Route path='/vnpay-return' element={
            <UserRequireAuth>
              <VNPayReturn/>
            </UserRequireAuth>
          }/>

          <Route path='/order/confirmation/:id' element={
            <UserRequireAuth>
              <Confirmation />
            </UserRequireAuth>
          }/>

          <Route path='/account/orders/details/:id' element={
            <UserRequireAuth>
              <MyOrderDetail/>
            </UserRequireAuth>
          }/>

          
          

          {/*==============Admin Routes======================*/}
          <Route path='/admin/login' element={<Login/>}/>
          
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard/>
            </AdminRequireAuth>
          }/>


          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategories/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory/>
            </AdminRequireAuth>
          }/>



          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrands/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand/>
            </AdminRequireAuth>
          }/>



          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProducts/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <CreateProduct/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct/>
            </AdminRequireAuth>
          }/>



          <Route path='/admin/orders' element={
            <AdminRequireAuth>
              <ShowOrders/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/orders/:id' element={
            <AdminRequireAuth>
              <OrderDetail/>
            </AdminRequireAuth>
          }/>



          <Route path='/admin/shipping' element={
            <AdminRequireAuth>
              <Shipping/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/profile' element={
            <AdminRequireAuth>
              <AdminProfile/>
            </AdminRequireAuth>
          }/>

          <Route path='/admin/customer' element={
            <AdminRequireAuth>
              <CustomerList/>
            </AdminRequireAuth>
          }/>

        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
