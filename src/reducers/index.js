import { combineReducers } from 'redux'
import homepage from './homepage';
import header from './header'

const RootReducer = combineReducers({
    homepage,
    header
});

export default RootReducer;