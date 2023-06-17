import axiosClient from './axosClient';

const departmentApi = {
    getListDepartment: () => {
        return axiosClient.get('/despartment');
    },
    getOne: (id) => {
        return axiosClient.patch(`/despartment/${id}`)
    },
    create: (body) => {
        return axiosClient.post('/despartment',{...body});
    },
    update: (body) => {
        const {id} = body;
        return axiosClient.put(`/despartment/${id}`,{...body});
    },
    deleteApi : (body) => {
        const {id} = body;
        return axiosClient.delete(`/despartment/${id}`);
    },
    getDevice: (id) => {
        return axiosClient.get(`/despartment/${id}/get-device`);
    },
    addDevice: (formData) => {
        return axiosClient.post('/despartment/add-device', formData);
    },
    removeDevice: (formData) => {
        return axiosClient.post('/despartment/remove-device', formData);
    }
}

export default departmentApi;