import TodoRepository from 'src/core/repositories/todo.repository';
import Todo from 'src/core/models/todo.model';

/**
 * Declaring fully possible types of repository here
 * Seperated by | symbol
 * @example: TestRepository<Test> | TodoRepository<Todo>
 */
type RepositoryType = TodoRepository<Todo>;

export default RepositoryType;