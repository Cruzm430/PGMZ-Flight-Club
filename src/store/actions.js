import {SET_USERS, SET_SHOES, SET_CATEGORIES, SEARCH_BY_NAME} from './constants';
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

const getUsers = ()=>{
  return null
}

const getShoes = () =>{
  return async (dispatch)=>{
    const shoes = (await axios.get('/shoes')).data
    return dispatch(setShoes(shoes))
  }
}

const getCategories = () =>{
  return null
}

const searchByName = (searchText) => {
  return async (dispatch) => {
    const shoes = (await axios.get(`/shoes/search/${searchText}`))
  }
}

export {
  getUsers,
  getShoes,
  getCategories,
  searchByName
}