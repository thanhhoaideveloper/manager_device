import axiosClient from './axosClient';

const deviceApi = {
    getListDevice: (filter = {}) => {
        return axiosClient.get('/device/get-list', filter);
    },
    create: (body) => {
        return axiosClient.post('/device',{...body});
    },
    update: (body) => {
        const {id} = body;
        return axiosClient.put(`/device/${id}`,{...body});
    },
    deleteApi : (body) => {
        const {id} = body;
        return axiosClient.delete(`/device/${id}`);
    }
}

export default deviceApi;