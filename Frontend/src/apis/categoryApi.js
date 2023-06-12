import axiosClient from './axosClient';

const categoryApi = {
    getListCategories: () => {
        return axiosClient.get('/categories');
    }
}

export default categoryApi;