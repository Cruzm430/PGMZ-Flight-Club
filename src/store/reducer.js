/* eslint-disable default-case */
import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, SEARCH_BY_NAME} from './constants';

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
  return state;
}

const reducer = combineReducers({
  shoes: shoesReducer
})

export default reducer;
