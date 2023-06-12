import axiosClient from './axosClient';

const categoryApi = {
    getListCategories: () => {
        return axiosClient.get('/categories');
    },
    create: (body) => {
        return axiosClient.post('/categories',{...body});
    }
}

export default categoryApi;