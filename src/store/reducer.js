import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, SET_AUTH} from './constants';

const shoesReducer = (state = [], action)=>{
  if(action.type === SET_SHOES){
    return action.shoes
  }
  else if(action.type === CREATE_SHOE){
    return [...state, action.shoe]
  }
  return state
}

const categoriesReducer = (state = [], action) => {
  if(action.type === SET_CATEGORIES){
    return action.categories
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
  auth:authReducer,
  categories:categoriesReducer
})

export default reducer