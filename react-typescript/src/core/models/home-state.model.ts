import Todo from 'src/core/models/todo.model';

type HomeStateType = {
    todos: Array<Todo>,
    error: null,
    isLoading: boolean,
}

export default HomeStateType;