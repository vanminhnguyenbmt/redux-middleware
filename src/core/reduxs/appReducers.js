import { combineReducers } from 'redux';
import homeReducer from 'src/core/reduxs/Home/Home.reducer';

const appReducers = combineReducers({
    homeReducer
});

export default appReducers;
