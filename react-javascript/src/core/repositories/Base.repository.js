import * as CONST from 'src/core/utils/constants';
import axios from 'axios';
import _ from 'lodash';

export default class BaseRepository {
    constructor(uri) {
        this.uri = uri;
        this.repository = this.axiosClient();
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

    _invalidObject(payload) {
        if (!_.isObject(payload)) return 'Payload is invalid';
        if ((payload instanceof FormData) && (_.isNil(payload) || payload.entries().next().done)) {
            return 'Payload is Empty';
        }

        return null;
    }

    getById(id) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${this.uri}/${id}`);
    }

    getOne(id) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${this.uri}?id=${id}`);
    }

    getAll() {
        return this.repository.get(`${this.uri}`);
    }

    pagination({ pageIndex = 1, limit = 10 }) {
        let offset = (pageIndex - 1) * limit;

        return this.repository.get(`${this.uri}?limit=${limit}&offset=${offset}`);
    }

    search(searchText) {
        if (_.isNil(searchText)) return Promise.reject('SearchText is empty');

        return this.repository.get(`${this.uri}?search=${searchText}`);
    }

    create(payload = {}) {
        let invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.post(`${this.uri}`, payload);
    }

    update(payload = {}) {
        let invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.put(`${this.uri}`, payload);
    }

    delete(id) {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.delete(`${this.uri}/${id}`)
    }
}
