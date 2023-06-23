import axiosClient from './axosClient';

const departmentApi = {
    getListDepartment: () => {
        return axiosClient.get('/department');
    },
    getOne: (id) => {
        return axiosClient.patch(`/department/${id}`)
    },
    create: (body) => {
        return axiosClient.post('/department',{...body});
    },
    update: (body) => {
        const {id} = body;
        return axiosClient.put(`/department/${id}`,{...body});
    },
    deleteApi : (body) => {
        const {id} = body;
        return axiosClient.delete(`/department/${id}`);
    },
    getDevice: (id) => {
        return axiosClient.get(`/department/${id}/get-device`);
    },
    addDevice: (formData) => {
        console.log('formData',formData)
        return axiosClient.post('/department/add-device', formData);
    },
    removeDevice: (formData) => {
        return axiosClient.post('/department/remove-device', formData);
    }
}

export default departmentApi;