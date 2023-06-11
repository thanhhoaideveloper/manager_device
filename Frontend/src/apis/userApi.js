import axiosClient from './axosClient';

const userApi = {
    getListUser: () => {
        return axiosClient.get('/users');
    }
}

export default userApi;