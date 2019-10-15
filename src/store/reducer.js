import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES} from './constants';

const shoesReducer = (state = [], action)=>{
  if(action.type === SET_SHOES){
    return action.shoes
  }
  return state
}

const reducer = combineReducers({
  shoes:shoesReducer
})

export default reducer