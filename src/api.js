import axios from 'axios';

class API {
    constructor() {
        this.baseUrl = 'https://growdev-test-node.herokuapp.com'
    }

    //users
    get(url) {
        const api = axios.create({
            baseURL: this.baseUrl,
        });

        return api.get(url);
    }

    getAuth(url, token) {
        const api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        return api.get(url);
    }

    //users, { username: "roger" }
    post(url, data) {
        const api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        return api.post(url, data);
    }

    postAuth(url, data, token) {
        const api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        return api.post(url, data);
    }
}

export default new API();