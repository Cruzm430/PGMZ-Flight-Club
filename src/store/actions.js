import {SET_USERS, SET_SHOES, SET_CATEGORIES, CREATE_SHOE, DUMMY_KEY, SET_AUTH} from './constants';
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
        const auth =  await axios.post('/api/login', user)
        // Use auth token for future implementation
        // window.localStorage.setItem('x-auth-token', JSON.stringify(auth.data.token))
        window.localStorage.setItem('user', JSON.stringify(auth.data.user))
        return dispatch(_login(auth.data))
    };
};

const attemptSessionLogin = ()=> {
    return async(dispatch)=> {
        const user = window.localStorage.getItem('user')
        JSON.parse(user)
        if(!user) {
            return
        }
        else {
            dispatch({ type: 'SET_AUTH', auth: user});
        }
    };
  };
  

const logout = ()=> {
    return async(dispatch)=> {
        window.localStorage.clear('user')
      await axios.delete('/api/sessions');
      dispatch({ type: 'SET_AUTH', auth: null});
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

export{
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
  createShoe
}
