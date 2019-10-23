import React from 'react';
import {Link, HashRouter, Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'


const Header = ({shoes, user})=>{
    return(
      <div>
        {console.log(user)}
        <AppBar>
        <Link to='/add'>Create</Link>
        <HashRouter>
          <Switch>
          {
            user && (<Route path='/' component= { Welcome } exact/>)
          }
          {
            !user && (<Route path='/' component= { Login } exact/>)
          }
          </Switch>
        </HashRouter>
        </AppBar>
      </div>
    )
  }
  
  

const mapStateToProps = ({shoes, user}) =>{
  return{
    shoes,
    user
  }
}

export default connect(mapStateToProps)(Header)

