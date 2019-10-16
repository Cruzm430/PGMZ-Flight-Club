import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, SET_AUTH} from './constants';

const shoesReducer = (state = [], action)=>{
  if(action.type === SET_SHOES){
    return action.shoes
  }
  return state
}

const authReducer = (state = '', action) => {
    if(action.type === SET_AUTH) {
        return action.auth
    }
    return state
}

const reducer = combineReducers({
  shoes:shoesReducer,
  auth:authReducer
})

export default reducer