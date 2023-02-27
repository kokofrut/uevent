import axios from "axios";
import $api from ".";

class AuthService {
    static async register({ username, password, confirmation, email }) {
        try {
            const { status } = await $api.post('/auth/register', { username, password, confirmation, email });
            return status;
        } catch (e) {
            const errorStr = (Object.hasOwn(e.response.data, 'errors')) ?
                `\n\t${e.response.data.errors.join('\n\t')}`
                :
                e.response.data;
            console.error(`Signup Error: ${errorStr}`);
            throw e;
        }
    }

    static async login({ username, password }) {
        try {
            const response = await $api.post('/auth/login', { username, password });
            return response;
        } catch (e) {
            const errorStr = (Object.hasOwn(e.response.data, 'errors')) ?
                `\n\t${e.response.data.errors.join('\n\t')}`
                :
                e.response.data;
            console.error(`Login Error: ${errorStr}`);
            throw e;
        }
    }

    static async refreshToken() {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/refresh-token', { withCredentials: true });
            return response;
        } catch (e) {
            throw e;
        }
    }

    static async logout() {
        try {
            const { data } = await $api.post('/auth/logout');
            return data;
        } catch (e) {
            throw e;
        }
    }

    static async resetPassword({ email }) {
        try {
            const { data } = await $api.post('/auth/password-reset', { email });
            return data;
        } catch (e) {
            const errorStr = (Object.hasOwn(e.response.data, 'errors')) ?
                `\n\t${e.response.data.errors.join('\n\t')}`
                :
                e.response.data;
            console.error(`Password Reset Error: ${errorStr}`);
            throw e;
        }
    }

    static async confirmReset(token, { new_password }) {
        try {
            const { data } = await $api.post(`/auth/password-reset/${token}`, { new_password });
            return data;
        } catch (e) {
            console.error(`Password Reset Error: ${e.response?.data}`);
            throw e;
        }
    }
}

export default AuthService;