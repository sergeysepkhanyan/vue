import axios from 'axios';
import TokenService from './token.service';
const API_URL = import.meta.env.VITE_API_ENDPOINT;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    handleResponse(response) {
        if (response.status === 401) {
            this.logout();
            location.reload();
            const error = response.data && response.data.message;
            return Promise.reject(error);
        }
        return Promise.resolve(response);
    }
}

export default new AuthService();