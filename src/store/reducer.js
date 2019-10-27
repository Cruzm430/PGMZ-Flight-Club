/* eslint-disable default-case */
import {combineReducers} from 'redux';
import {SET_USERS, SET_SHOES, SET_CATEGORIES, SET_ORDERS, CREATE_SHOE, SET_AUTH, DELETE_SHOE, UPDATE_SHOE, SET_CART,
        SET_LINE_ITEMS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, CREATE_ORDER, UPDATE_ORDER} from './constants';

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

const lineItemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_LINE_ITEMS:
      console.log(action.lineItems);
      return action.lineItems;
    case CREATE_LINE_ITEM:
      return [...state, action.lineItem];
    case UPDATE_LINE_ITEM:
      return state.map(lineItem => {
        return lineItem.id === action.lineItem.id ? action.lineItem : lineItem
      });
  }
  return state;
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER:
      return state.map(order => {
        return order.id === action.order.id ? action.order : order
      });
  }
  return state;
}

const reducer = combineReducers({
  shoes: shoesReducer,
  user: authReducer,
  categories: categoriesReducer,
  lineItems: lineItemsReducer,
  orders: ordersReducer,
  cart: cartReducer
})

export default reducer;
