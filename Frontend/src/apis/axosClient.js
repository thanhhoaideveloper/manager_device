import axios from 'axios';
import Cookie from 'js-cookie';

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:5000/api/v1`,
    headers: {
        "Content-Type" : "application/json"
    }
})

axiosClient.interceptors.request.use(async (request) => {
    const token = localStorage.getItem('_token');
    if(token){
        request.headers.Authorization = `${token}`;
    }
    return request;
});

axiosClient.interceptors.response.use(async (response) => {
    if(response.data){
        return response.data;
    }

    return response;
}, (error) => {
    if(error.response.status === 401){
        localStorage.clear();
        window.location.href = '/login';
    }
    throw error;
})

export default axiosClient;