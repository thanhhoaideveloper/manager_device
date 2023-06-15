import axiosClient from './axosClient';

const departmentApi = {
    getListDepartment: () => {
        return axiosClient.get('/despartment');
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
    }
}

export default departmentApi;