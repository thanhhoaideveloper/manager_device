import axiosClient from './axosClient';

const deviceApi = {
    getListDevice: () => {
        return axiosClient.get('/device');
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