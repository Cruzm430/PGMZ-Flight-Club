/* eslint-disable default-case */
import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, SET_AUTH, DELETE_SHOE, UPDATE_SHOE, SET_CART} from './constants';

const shoesReducer = (state = [], action)=>{
  switch (action.type) {
    case SET_SHOES:
      return action.shoes;
    case CREATE_SHOE:
      return [...state, action.shoe];
    case UPDATE_SHOE:
      return state.map(_shoe=> _shoe.id === action.shoe.id ? action.shoe : _shoe)
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

const cartReducer = (state = [], action) => {
    console.log('cartReducer', action.cart)
    switch(action.type){
        case SET_CART:
            return action.cart;
        }
        return state
}

const reducer = combineReducers({
  shoes:shoesReducer,
  user:authReducer,
  categories:categoriesReducer,
  cart: cartReducer
})

export default reducer;
