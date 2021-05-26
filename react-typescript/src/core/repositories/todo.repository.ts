import * as CONST from 'src/core/utils/constants';
import BaseRepository from 'src/core/repositories/base.repository';

export default class TodoRepository extends BaseRepository {
    constructor() {
        super(CONST.ApiURI.TODO);
    }
}
