import * as Types from 'src/core/reduxs/home/home.type';
import * as CONST from 'src/core/utils/constants';
import Repository from 'src/core/repositories/repository-factory';
import { AxiosError, AxiosResponse } from 'axios';

const TodoRepository = Repository.get(CONST.RepositoryName.TODO);

export const actGetListTodo = () => (dispatch: any): void  => {
    dispatch({
        types: [Types.GET_LIST_TODO_REQUEST, Types.GET_LIST_TODO_SUCCESS, Types.GET_LIST_TODO_FAILURE],
        callAPI: () => TodoRepository.getAll(),
        callBack: {
            success: (response: AxiosResponse) => { console.log('callAPI success', response) },
            failure: (error: AxiosError) => { console.log('callAPI failure', error) }
        }
    })
};
