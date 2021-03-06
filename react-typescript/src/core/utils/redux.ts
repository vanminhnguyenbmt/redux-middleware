import { AxiosError, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import ActionType from 'src/core/models/redux-action.model';

/**
 *
 * @param {Array} types is an array with 3 elements in the following order [BEGIN_REQUEST, SUCCESS, FAILURE]
 * @param {Function} callAPI is a promise function
 * @param {Object} callBack is an object with 2 props function: success(response), failure(error)
 * @example
 * callBack = {
 *  success: (response) => { //todo },
 *  failure: (error) => { //todo }
 * }
 */
export function callAPIMiddleware({ dispatch, getState }: any) {
    return (next: any) => (action: ActionType): any => {
        const { types, callAPI, callBack = {
            success: () => { },
            failure: () => { }
        } } = action;

        if (!types) {
            // Normal acion: pass it on
            return next(action);
        }

        if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
            throw new Error('Expected an array of three string types.');
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.');
        }

        const [requestType, successType, failureType] = types;

        dispatch({
            type: requestType
        });

        return callAPI()
            .then((response: AxiosResponse) => {
                if (callBack && typeof callBack === 'object' && callBack.success && typeof callBack.success === 'function') {
                    callBack.success(response);
                }

                dispatch({
                    type: successType,
                    payload: response?.data
                })
            }
            ).catch((error: AxiosError) => {
                if (callBack && typeof callBack === 'object' && callBack.failure && typeof callBack.failure === 'function') {
                    callBack.failure(error);
                }

                dispatch({
                    type: failureType,
                    payload: error
                })
            })
    }
}

/**
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @example
 * {
 *   [ActionTypes.ADD_TODO]: (state, action) => {
 *       const data = action.payload.data
 *       return {...state, data}
 *   }
 * }
 *
 */
export function createReducer(initialState = {}, handlers: { [key: string]: any } = {}) {
    return function reducer(state = initialState, action: AnyAction): typeof initialState {
        if (handlers && Object.prototype.hasOwnProperty.call(handlers, action.type)) {
            return handlers[action.type](state, action);
        }

        return state;
    }
}