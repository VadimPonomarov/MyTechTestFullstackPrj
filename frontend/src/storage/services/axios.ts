import axios from "axios";

import {
    ILoginInputs,
    IRegistrationInputs,
    IToken,
    TokenTypeEnum
} from "../slices/auth-slice/interfaces";
import {ICategory} from "../slices/category-slice/interfaces";
import {ITask} from "../slices/task-slice/interfaces";

const _baseUrl = process.env.REACT_APP_AXIOS_BASE_URL as string;

const _axios = axios.create({
    baseURL: _baseUrl,
    /* withCredentials: false,*/
});

const getTokenByType = (type: TokenTypeEnum) => {
    const jsonTokenPair = localStorage.getItem('tokenPair')
    const parsedTokenPair =
        jsonTokenPair ?
            JSON.parse(jsonTokenPair) as (IToken[] | undefined) :
            undefined;
    if (!parsedTokenPair) return
    const result: IToken | undefined = parsedTokenPair.find(item => item.type === type)
    if (result) return result.token
}

_axios.interceptors.request.use((config): any => {
    try {
        config.headers.Authorization = "Bearer " + getTokenByType(TokenTypeEnum.ACCESS) || '';
        return config;
    } catch (e) {
        console.log(e)
    }
}, (error) => {
    return Promise.reject(error);
});

_axios.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.statusCode !== 401) throw new Error(error);
    const originalReq = error.config;

    try {
        _axiosService.getRefreshToken()
            .then(res => localStorage
                .setItem('tokenPair', JSON.stringify(res.data.data)))
            .then(() => _axios.request(originalReq))
            .catch(e => console.log(e))

    } catch (e) {
        console.log(e)
    }
});


export const _axiosService = {
    postLogin: (body: ILoginInputs) => _axios.post('/auth/login', body),
    postRegistration: (body: IRegistrationInputs) => _axios.post('/users', body),
    getRefreshToken: () => _axios.post(
        '/auth/refresh',
        {
            type: TokenTypeEnum.REFRESH,
            token: getTokenByType(TokenTypeEnum.REFRESH)
        }
    ),
    postCategory: (body: Partial<ICategory>) => _axios.post('/categories', body),
    putCategory: (id: number | string, body: Partial<ICategory>) => _axios.put(`/categories/${+id}`, body),
    deleteCategory: (id: number | string) => _axios.delete(`/categories/${+id}`),
    getCaregories: () => _axios.get('/categories'),
    postTask: (body: ITask) => _axios.post('/tasks', body),
    putTask: (id: number | string, body: Partial<ITask>) => _axios.put(`/tasks/${+id}`, body),
    deleteTask: (id: number | string) => _axios.delete(`/tasks/${+id}`),
    getTaskAllByCategoryId: (categoryId: number | string) => _axios.get(`/tasks/category/${+categoryId}`)
}

