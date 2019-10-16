import {SET_USERS, SET_SHOES, SET_CATEGORIES, SET_AUTH} from './constants';
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

const attemptLogin = (username) => {
    console.log('hi')
    return async(dispatch) => {
        const auth = (await axios.post('/api/sessions', {username}).data)
        dispatch({ type: SET_AUTH, auth})
    };
};

export{
  getUsers,
  getShoes,
  getCategories,
  attemptLogin
}