import * as CONST from 'src/core/utils/constants';
import BaseRepository from 'src/core/repositories/Base.repository';

export default class HomeRepository extends BaseRepository {
    constructor() {
        super(CONST.ApiURI.TODO);
    }

    getAllCustom() {
        return this.setUri(CONST.ApiURI.TODO).getAll();
    }
}
