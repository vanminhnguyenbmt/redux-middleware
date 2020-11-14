/**
 *
 * @param {Array} types is an array with 3 elements in the following order [BEGIN_REQUEST, SUCCESS, FAILURE]
 * @param {Function} callAPI is a promise function
 * @param {Object} callBack is an object with 2 props function: success(response), failure(error)
 * callBack = {
 *  success: (response) => { },
 *  failure: (error) => { }
 * }
 */
export function callAPIMiddleware({ dispatch, getState }) {
    return next => action => {
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
            .then(response => {
                if (callBack && typeof callBack === 'object' && callBack.success && typeof callBack.success === 'function') {
                    callBack.success(response);
                }

                dispatch({
                    type: successType,
                    payload: response?.data
                })
            }
            ).catch(error => {
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
 * {
 *   [ActionTypes.ADD_TODO]: (state, action) => {
 *       const text = action.text.trim()
 *       return [...state, text]
 *   }
 * }
 *
 */
export function createReducer(initialState, handlers = {}) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }

        return state;
    }
}