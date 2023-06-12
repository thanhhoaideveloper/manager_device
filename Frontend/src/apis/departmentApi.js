import axiosClient from './axosClient';

const departmentApi = {
    getListDepartment: () => {
        return axiosClient.get('/despartment');
    }
}

export default departmentApi;