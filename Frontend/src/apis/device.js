import axiosClient from './axosClient';

const deviceApi = {
    getListDevice: () => {
        return axiosClient.get('/device');
    }
}

export default deviceApi;