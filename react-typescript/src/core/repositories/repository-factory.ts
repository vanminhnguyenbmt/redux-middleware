import * as CONST from 'src/core/utils/constants';
import TodoRepository from 'src/core/repositories/todo.repository';

const repositories: { [key: string]: any } = {
    [CONST.RepositoryName.TODO]: new TodoRepository()
};

export default {
    get: (name: string): any => repositories[name]
};