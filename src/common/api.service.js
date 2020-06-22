
import JWTService from "@/common/jwt.service";
import axios from 'axios'
import { API_URL } from "@/common/config";

const intance = axios.create({
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

const ApiService = {
    setHeader() {
        intance.defaults.headers.common['Authorization'] = 'Token ' + JWTService.getToken();
    },

    get(resource, slug) {
        return intance.get(`${ resource }`, slug);
    },

    post(resource, params) {
        return intance.post(`${ resource } `, params);
    },

    update(resource, slug, params) {
        return intance.put(`${ resource } /${slug}`, params);
    },

    put(resource, params) {
        return intance.put(`${resource}`, params);
    },

    delete(resource) {
        return intance.delete(resource);
    }
};

export default ApiService;