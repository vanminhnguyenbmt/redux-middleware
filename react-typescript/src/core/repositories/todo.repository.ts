import * as CONST from 'src/core/utils/constants';
import BaseRepository from 'src/core/repositories/base.repository';
import Todo from 'src/core/models/todo.model';
import { AxiosResponse } from 'axios';

export default class TodoRepository extends BaseRepository {
    constructor() {
        super(CONST.ApiURI.TODO);
    }

    getAllCustom(): Promise<AxiosResponse<Todo>> {
        return this.setUri(CONST.ApiURI.TODO).getAll<Todo>();
    }
}
