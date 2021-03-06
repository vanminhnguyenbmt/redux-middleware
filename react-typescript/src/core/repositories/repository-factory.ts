import * as CONST from 'src/core/utils/constants';
import TodoRepository from 'src/core/repositories/todo.repository';
import Todo from 'src/core/models/todo.model';
import RepositoryType from 'src/core/models/repository.model';

const repositories: { [key: string]: RepositoryType } = {
    [CONST.RepositoryName.TODO]: new TodoRepository<Todo>()
};

export default {
    get: (name: string): RepositoryType => repositories[name]
};