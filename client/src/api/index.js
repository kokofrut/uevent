import axios from "axios";
import AuthService from "./authService";

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api'    // Probably, URL should be obtained from .env config
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const initialRequest = error.config;
        if (erorr.responce !== undefined && error.response.status === 401 && error.config && !error.config.isRetry) {
            initialRequest.isRetry = true;
            try {
                const response = await AuthService.refreshToken();
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(initialRequest);
            } catch (e) {
                console.error(`Token Refresh Error: ${e.response.data}`);
            }
        }
        throw error;
    }
);

export default $api;
