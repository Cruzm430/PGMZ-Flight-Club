import {SET_USERS, SET_SHOES, SET_CATEGORIES} from './constants';
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

export{
  getUsers,
  getShoes,
  getCategories
}