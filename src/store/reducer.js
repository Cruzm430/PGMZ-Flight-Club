import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE} from './constants';
import { create } from 'domain';

const shoesReducer = (state = [], action)=>{
  if(action.type === SET_SHOES){
    return action.shoes
  }
  else if(action.type === CREATE_SHOE){
    return [...state, action.shoe]
  }
  return state
}

const reducer = combineReducers({
  shoes:shoesReducer
})

export default reducer