import {SET_USERS, SET_SHOES, SET_CATEGORIES, SEARCH_BY_NAME, CREATE_SHOE} from './constants';
import axios from 'axios';

const setUsers = (users) => {
  return{
    users,
    type:SET_USERS
  }
}

const setShoes = (shoes)=> {
  return{
    shoes,
    type:SET_SHOES
  }
}

const setCategories = (categories) =>{
  return{
    categories,
    type: SET_CATEGORIES
  }
}

const _searchByName = (shoes) => {
  return {
    shoes,
    type: SEARCH_BY_NAME
  }
}
const _createShoe = (shoe) =>{
  return{
    shoe,
    type:CREATE_SHOE
  }
}


const getUsers = ()=>{
  return null
}

const getShoes = () =>{
  return async (dispatch)=>{
    const shoes = (await axios.get('/shoes')).data
    return dispatch(setShoes(shoes))
  }
}

const createShoe = (shoe) =>{
  return async (dispatch)=>{
    const created = (await axios.post('/shoes', shoe)).data
    return dispatch(_createShoe(created))
  }
}

const getCategories = () =>{
  return async (dispatch) =>{
    const categories = (await axios.get('/categories')).data
    return dispatch(setCategories(categories))
  }
}

const searchByName = (searchText) => {
  if (!searchText) return (getShoes());
  return async (dispatch) => {
    const shoes = (await axios.get(`/shoes/search/${searchText}`)).data
    return dispatch(setShoes(shoes));
  }
}

export {
  getUsers,
  getShoes,
  getCategories,
  searchByName,
  createShoe
}