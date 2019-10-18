/* eslint-disable default-case */
import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, SEARCH_BY_NAME, CREATE_SHOE} from './constants';

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
    case CREATE_SHOE:
      return [...state, action.shoe]
  }
  return state;
}

const categoriesReducer = (state = [], action) => {
  if (action.type === SET_CATEGORIES){
    return action.categories
  }
  return state
}

const reducer = combineReducers({
  shoes: shoesReducer,
  categories: categoriesReducer
})

export default reducer;
