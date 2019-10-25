import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, DUMMY_KEY, SET_AUTH,
  DELETE_SHOE, UPDATE_SHOE, CREATE_LINE_ITEM, UPDATE_LINE_ITEM} from './constants';
import axios from 'axios';

const setUsers = (users) => {
  return {
    users,
    type:SET_USERS
  }
}

const setShoes = (shoes)=> {
  return {
    shoes,
    type: SET_SHOES
  }
}

const setCategories = (categories) =>{
  return {
    categories,
    type: SET_CATEGORIES
  }
}

const _createShoe = (shoe) =>{
  return {
    shoe,
    type: CREATE_SHOE
  }
}

const _deleteShoe = (shoe) => {
  return {
    shoe,
    type: DELETE_SHOE
  }
}

const _updateShoe = (shoe) =>{
  return{
    shoe,
    type: UPDATE_SHOE
  }
}

const getUsers = ()=>{
  return null
}

const _login = (user) => {
    return{
        user,
        type: SET_AUTH
    }
}

const _createLineItem = (lineItem) => {
  return {
    lineItem,
    type: CREATE_LINE_ITEM
  }
}

const _updateLineItem = (lineItem) => {
  return {
    lineItem,
    type: UPDATE_LINE_ITEM
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
        const auth =  await axios.post('/api/login', user)
        window.localStorage.setItem('authToken', auth.data.token)
        return dispatch(_login(auth.data.returnUser))
    };
};

const attemptSessionLogin = ()=> {
    return async(dispatch)=> {
        const token = window.localStorage.getItem('authToken')
        if(!token){
            return
        }
        const user = (await axios.post('/api/attemptSessionLogin', {token: token})).data
        if(!user) {
            return
        }
        else {
            dispatch({ type: 'SET_AUTH', user});
        }
    };
  };
  

const logout = ()=> {
    return async(dispatch)=> {
        window.localStorage.clear('authToken')
      dispatch({ type: 'SET_AUTH', user: null});
    };
  };

const searchByName = (searchText) => {
    if (!searchText) return (getShoes());
    return async (dispatch) => {
      const shoes = (await axios.get(`/shoes/search/${searchText}`)).data
      return dispatch(setShoes(shoes));
    }
  }
  
const searchByCat = (catKey) => {
    if (catKey === DUMMY_KEY) return (getShoes());
    return async (dispatch) => {
        const shoes = (await axios.get(`/shoes/filter/${catKey}`)).data
        return dispatch(setShoes(shoes));
    }
}

const deleteShoe = (shoe) => {
  return async (dispatch) => {
    await axios.delete(`/api/shoes/${shoe.id}`);
    return dispatch(_deleteShoe(shoe));
  }
}

const updateShoe = (shoe, update) => {
  return async(dispatch)=> {
    await axios.put(`/api/shoes/${shoe.id}`, update)
    return dispatch(_updateShoe(update))
  }
}

const createLineItem = (lineItem) => {
  return async (dispatch)=>{
    const created = (await axios.post('/api/lineitems', lineItem)).data
    return dispatch(_createLineItem(created))
  }
}

const updateLineItem = (lineItem, update) => {
  return async(dispatch)=> {
    await axios.put(`/api/lineitems/${lineItem.id}`, update)
    return dispatch(_updateLineItem(update))
  }
}

export {
  getUsers,
  getShoes,
  getCategories,
  setUsers,
  _login,
  attemptSessionLogin,
  logout,
  attemptLogin,
  searchByName,
  searchByCat,
  createShoe,
  deleteShoe,
  updateShoe,
  createLineItem,
  updateLineItem
}
