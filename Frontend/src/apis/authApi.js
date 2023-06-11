import axiosClient from "./axosClient";

const authApi = {
    isAuth: () => {
        return axiosClient.get('/')
    }
}