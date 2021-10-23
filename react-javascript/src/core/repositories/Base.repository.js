import * as CONST from 'src/core/utils/constants';
import axios from 'axios';
import _ from 'lodash';

export default class BaseRepository {
    constructor(uri) {
        this.uri = uri;
        this.repository = this.axiosClient();
        this.repository.interceptors.request.use(config => {
            const yourToken = 'your_token';
            config.headers['Authorization'] = `Bearer ${yourToken}`;

            return config;
        });
        this.repository.interceptors.response.use(this.handleSuccess, this.handleError)
    }

    axiosClient(headers = {}) {
        const baseURL = process.env.REACT_APP_BASE_URL;
        return axios.create({
            baseURL,
            headers: {
                ...headers,
            }
        });
    }

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {
        console.error('axios error:', error);
        switch (error.response.status) {
            case CONST.HttpStatus.UNAUTHORIZED:
                break;
            case CONST.HttpStatus.NOT_FOUND:
                break;
            default:
                break;
        }
        return Promise.reject(error)
    }

    setUri(uri) {
        this.uri = uri;
        return this;
    }

    _invalidObject(payload) {
        if (!_.isObject(payload)) return 'Payload is invalid';
        if ((payload instanceof FormData) && (_.isNil(payload) || payload.entries().next().done)) {
            return 'Payload is Empty';
        }

        return null;
    }

    getById(id, uri) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${uri || this.uri}/${id}`);
    }

    getOne(id, uri) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${uri || this.uri}?id=${id}`);
    }

    getAll(uri) {
        return this.repository.get(`${uri || this.uri}`);
    }

    pagination({ pageIndex = 1, limit = 10 }, uri) {
        let offset = (pageIndex - 1) * limit;

        return this.repository.get(`${uri || this.uri}?limit=${limit}&offset=${offset}`);
    }

    search(searchText, uri) {
        if (_.isNil(searchText)) return Promise.reject('SearchText is empty');

        return this.repository.get(`${uri || this.uri}?search=${searchText}`);
    }

    create(payload = {}, uri) {
        let invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.post(`${uri || this.uri}`, payload);
    }

    update(payload = {}, uri) {
        let invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.put(`${uri || this.uri}`, payload);
    }

    delete(id, uri) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.delete(`${uri || this.uri}/${id}`)
    }
}
