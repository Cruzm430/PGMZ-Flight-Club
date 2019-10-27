import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, DUMMY_KEY, SET_AUTH, DELETE_SHOE, UPDATE_SHOE,SET_CART, SET_ORDERS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM} from './constants';
import axios from 'axios';

const setUsers = (users) => {
  return {
    users,
    type: SET_USERS
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

const _updateCart = (cart) => {
    return{
        cart,
        type: SET_CART
    }
}

const setLineItems = (lineItems) => {
  return {
    lineItems,
    type: SET_LINE_ITEMS
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

const _deleteLineItem = (lineItem) => {
  return {
    lineItem,
    type:DELETE_LINE_ITEM
  }
}

const setOrders = (orders) => {
  return {
    orders,
    type: SET_ORDERS
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
        history.pushState(null,'/')
      dispatch({ type: 'SET_AUTH', user: null})
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

const updateCart = (user) => {
    // console.log('testing save')
    // console.log('user to updatecart: ', user.id)
    return async(dispatch) => {
        const cart = (await axios.get(`/cart/${user.id}`)).data
        // console.log('cart', cart)
        return dispatch(_updateCart(cart))
    }
 }

const getLineItems = () => {
  return async (dispatch) => {
    const lineItems = (await axios.get('/api/lineitems')).data
    return dispatch(setLineItems(lineItems));
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
    const newItem = (await axios.put(`/api/lineitems/${lineItem.id}`, update)).data
    return dispatch(_updateLineItem(newItem))
  }
}

const deleteLineItem = (lineItem) => {
  return async (dispatch) =>{
    await axios.delete(`/api/lineitems/${lineItem.id}`)
    return dispatch(_deleteLineItem(lineItem))
  }
}

const getOrders = () => {
  return async (dispatch) => {
    const orders = (await axios.get('/api/orders')).data
    return dispatch(setOrders(orders));
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
  updateCart,
  deleteShoe,
  updateShoe,
  createShoe,
  getLineItems,
  createLineItem,
  updateLineItem,
  getOrders,
  deleteLineItem
}
