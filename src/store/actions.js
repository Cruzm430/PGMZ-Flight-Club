import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, SET_AUTH} from './constants';
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

const _createShoe = (shoe) =>{
  return{
    shoe,
    type:CREATE_SHOE
  }
}

const getUsers = ()=>{
  return null
}

const _login = (auth) => {
    return{
        auth,
        type: SET_AUTH
    }
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

const attemptLogin = (user) => {
    return async(dispatch) => {
        const auth =  await axios.post('/api/sessions', user)
        console.log(auth.data)
        return dispatch(_login(auth.data))
    };
};


export{
  getUsers,
  getShoes,
  getCategories,
  setUsers,
  _login,
  attemptLogin,
  createShoe
}