import * as Types from 'src/core/reduxs/Home/Home.type';
import { createReducer } from 'src/core/utils/redux';

const initialState = {
    todos: [],
    error: null,
    isLoading: false,
};

const homeReducer = createReducer(initialState, {
    [Types.GET_LIST_TODO_REQUEST]: (state, action) => {
        return {
            ...state,
            todos: [],
            error: null,
            isLoading: true,
        };
    },
    [Types.GET_LIST_TODO_SUCCESS]: (state, action) => {
        return {
            ...state,
            todos: action.payload,
            error: null,
            isLoading: false,
        };   
    },
    [Types.GET_LIST_TODO_FAILURE]: (state, action) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    }
})

export default homeReducer;
