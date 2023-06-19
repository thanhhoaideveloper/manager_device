import axiosClient from './axosClient';

const userApi = {
    getListUser: () => {
        return axiosClient.get('/users');
    },
    createUser: (formData) => {
        return axiosClient.post('/users', formData);
    },
    updateUser: (id, formData) => {
        return axiosClient.put(`/users/${id}`, formData);
    },
    getListPermission: (id) => {
        return axiosClient.get(`/users/permission/${id}`);
    },
    deleteUser: (id) => {
        return axiosClient.delete(`/users/${id}`)
    },
    updateRole: (formData) => {
        return axiosClient.post('/users/change-permission', formData);
    }
}

export default userApi;