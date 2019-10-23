/* eslint-disable default-case */
import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, SET_AUTH, DELETE_SHOE} from './constants';

const shoesReducer = (state = [], action)=>{
  // if(action.type === SET_SHOES){
  //   return action.shoes
  // }
  // return state

  switch (action.type) {
    case SET_SHOES:
      return action.shoes;
    case CREATE_SHOE:
      return [...state, action.shoe]
    case DELETE_SHOE:
      return state.filter(shoe => shoe.id !== action.shoe.id);
  }
  return state;
}

const categoriesReducer = (state = [], action) => {
  if (action.type === SET_CATEGORIES){
    return action.categories
  }
  return state
}

const authReducer = (state = '', action) => {
    if(action.type === SET_AUTH) {
        return action.user
    }
    return state
}

const reducer = combineReducers({
  shoes:shoesReducer,
  user:authReducer,
  categories:categoriesReducer
})

export default reducer;
