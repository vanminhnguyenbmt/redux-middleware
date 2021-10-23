import * as Types from 'src/core/reduxs/Home/Home.type';
import * as CONST from 'src/core/utils/constants';
import Repository from 'src/core/repositories/RepositoryFactory';

const HomeRepository = Repository.get(CONST.RepositoryName.HOME);

export const actGetListTodo = () => (dispatch) => {
    dispatch({
        types: [Types.GET_LIST_TODO_REQUEST, Types.GET_LIST_TODO_SUCCESS, Types.GET_LIST_TODO_FAILURE],
        callAPI: () => HomeRepository.getAllCustom(),
        callBack: {
            success: response => { console.log('callAPI success', response) },
            failure: error => { console.log('callAPI failure', error) }
        }
    })
};

