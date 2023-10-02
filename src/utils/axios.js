import deafultAxios from 'axios';

const axios = () => deafultAxios.create({
    //https://e-commerce-api-v2.academlo.tech/api/v1'
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export default axios;