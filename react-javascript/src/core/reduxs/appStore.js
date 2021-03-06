import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from 'src/core/reduxs/appReducers';
import { callAPIMiddleware } from 'src/core/utils/redux';

const middlwares = [thunk, callAPIMiddleware];

const appStore = createStore(
    appReducers,
    applyMiddleware(...middlwares),
);

export default appStore;
