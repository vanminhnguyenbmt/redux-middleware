import { combineReducers } from 'redux';
import homeReducer from 'src/core/reduxs/home/home.reducer';

const appReducers = combineReducers({
    homeReducer
});

export default appReducers;
