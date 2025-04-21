import React from 'react'

// Thông báo khi không có dữ liệu
const Nostate = ({text='Không có dữ liệu!'}) => {
  return (
    <div className='text-center py-5'>{text}</div>
  )
}

export default Nostate