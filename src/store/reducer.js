/* eslint-disable default-case */
import {combineReducers} from 'redux';
<<<<<<< HEAD
import {SET_USERS, SET_SHOES, SET_CATEGORIES, SEARCH_BY_NAME} from './constants';
=======
import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE} from './constants';
import { create } from 'domain';
>>>>>>> master

const shoesReducer = (state = [], action)=>{
  // if(action.type === SET_SHOES){
  //   return action.shoes
  // }
  // return state

  switch (action.type) {
    case SET_SHOES:
      return action.shoes;
    case SEARCH_BY_NAME:
      return action.shoes;
  }
<<<<<<< HEAD
  return state;
=======
  else if(action.type === CREATE_SHOE){
    return [...state, action.shoe]
  }
  return state
>>>>>>> master
}

const reducer = combineReducers({
  shoes: shoesReducer
})

export default reducer;
