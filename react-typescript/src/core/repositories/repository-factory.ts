import TodoRepository from 'src/core/repositories/todo.repository';

export enum RepositoryName {
    TODO = 'todoRepository'
}

type RepositoryValue = {
    [RepositoryName.TODO]: TodoRepository
}

type RepositoryType = {
    [key in RepositoryName]: RepositoryValue[key];
}

const Repositories: RepositoryType = {
    [RepositoryName.TODO]: new TodoRepository()
};

export default Repositories;