import axiosClient from './axosClient';

const categoryApi = {
    getListCategories: () => {
        return axiosClient.get('/categories');
    },
    create: (body) => {
        return axiosClient.post('/categories',{...body});
    },
    update: (body) => {
        const {id} = body;
        return axiosClient.put(`/categories/${id}`,{...body});
    },
    deleteApi : (body) => {
        const {id} = body;
        return axiosClient.delete(`/categories/${id}`);
    }
}

export default categoryApi;