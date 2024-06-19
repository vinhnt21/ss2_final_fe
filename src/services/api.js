import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:5000/user/refresh', {}, {
                    headers: {Authorization: `Bearer ${refreshToken}`}
                });
                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    API.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
                    return API(originalRequest);
                }
            } catch (e) {
                alert("Session expired, please login again")
                localStorage.clear();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const login = (username, password) => API.post('/user/login', {username, password});
export const getAnswer = (question) => API.post('/chat/get-answer', {question});


