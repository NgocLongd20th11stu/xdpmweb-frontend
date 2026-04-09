export const apiURL = 'http://localhost:8000/api'
//export const apiURL = 'https://xdpmweb-backend.onrender.com/api'

export const adminToken = () =>{
    const data = JSON.parse(localStorage.getItem('adminInfo'))
    return data.token;
}