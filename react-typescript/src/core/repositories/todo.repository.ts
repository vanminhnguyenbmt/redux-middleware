import * as CONST from 'src/core/utils/constants';
import BaseRepository from 'src/core/repositories/base.repository';

export default class TodoRepository<T> extends BaseRepository<T> {
    constructor() {
        super(CONST.ApiURI.TODO);
    }
}
