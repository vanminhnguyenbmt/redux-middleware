import * as CONST from 'src/core/utils/constants';
import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';
import qs from 'qs';

export default class BaseRepository {
    uri: string;
    repository: AxiosInstance;

    constructor(uri: string) {
        this.uri = uri;
        this.repository = this.axiosClient();
        this.repository.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            const yourToken = 'your_token';
            config.headers['Authorization'] = `Bearer ${yourToken}`;

            return config;
        });
        this.repository.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    axiosClient(headers = {}): AxiosInstance {
        const baseURL = process.env.REACT_APP_BASE_URL;
        return axios.create({
            baseURL,
            headers: {
                ...headers,
            }
        });
    }

    handleSuccess(response: AxiosResponse): AxiosResponse {
        return response;
    }

    handleError = (error: AxiosError): any => {
        console.error('axios error:', error);
        switch (error?.response?.status) {
            case CONST.HttpStatus.UNAUTHORIZED:
                break;
            case CONST.HttpStatus.NOT_FOUND:
                break;
            default:
                break;
        }

        return Promise.reject(error);
    }

    _invalidObject(payload = {}): string | null {
        if (!_.isObject(payload)) return 'Payload is invalid';
        if ((payload instanceof FormData) && (_.isNil(payload) || payload.entries().next().done)) {
            return 'Payload is Empty';
        }

        return null;
    }

    getById<T>(id: number, uri?: string): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');
        return this.repository.get(`${uri || this.uri} /${id}`);
    }

    getOne<T>(id: number, uri?: string): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${uri || this.uri}?id=${id}`);
    }

    getAll<T>(uri?: string): Promise<AxiosResponse<T>> {
        return this.repository.get(`${uri || this.uri}`);
    }

    /**
    * @param {object} is a object query
    * @example {a: 1, b: '2', c: 'string'}
    * ⟹ a=1&b=2&c=string
    */
    query<T>(object: Record<string, any>, uri?: string): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(object);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.get(`${uri || this.uri}?${qs.stringify(object)}`);
    }

    pagination<T>({ pageIndex = 0, limit = 10, sortBy = 'createdTime', sortType = 'DESC' }: { pageIndex: number, limit: number, sortBy?: string, sortType?: string }, uri?: string): Promise<AxiosResponse<T>> {
        return this.repository.get(`${uri || this.uri}?itemsPerPage=${limit}&pageId=${pageIndex}&sortBy=${sortBy}&sortType=${sortType}`);
    }

    search<T>(searchText: string | number, uri?: string): Promise<AxiosResponse<T>> {
        if (_.isNil(searchText)) return Promise.reject('SearchText is empty');

        return this.repository.get(`${uri || this.uri}?search=${searchText}`);
    }

    create<T>(payload = {}, uri?: string): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.post(`${uri || this.uri}`, payload);
    }

    update<T>(payload = {}, uri?: string): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.put(`${uri || this.uri}`, payload);
    }

    delete<T>(id: number, uri?: string): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.delete(`${uri || this.uri}/${id}`)
    }

    customConfig<T>(config: AxiosRequestConfig): AxiosPromise<T> {
        return axios(config);
    }
}
