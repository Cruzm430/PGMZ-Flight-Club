import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import * as actions from './actions';

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
export {actions}