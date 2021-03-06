import { AnyAction } from 'redux';
import HomeStateType from 'src/core/models/home-state.model';
import * as Types from 'src/core/reduxs/home/home.type';
import { createReducer } from 'src/core/utils/redux';

const initialState: HomeStateType = {
    todos: [],
    error: null,
    isLoading: false,
};

const homeReducer = createReducer(initialState, {
    [Types.GET_LIST_TODO_REQUEST]: (state: typeof initialState, action: AnyAction) => {
        return {
            ...state,
            todos: [],
            error: null,
            isLoading: true,
        };
    },
    [Types.GET_LIST_TODO_SUCCESS]: (state: typeof initialState, action: AnyAction) => {
        return {
            ...state,
            todos: action.payload,
            error: null,
            isLoading: false,
        };
    },
    [Types.GET_LIST_TODO_FAILURE]: (state: typeof initialState, action: AnyAction) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    }
})

export default homeReducer;
