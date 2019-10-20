import React from 'react';
import {Link, HashRouter, Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'

const Header = ({shoes, auth}) => {
  return(
      <nav>
        {console.log(auth)}
        <h1>PMGZ Flight Club</h1>
        <Link to='/add'>Create</Link>
        <HashRouter>
          <Switch>
          {
            auth && (<Route path='/' component= { Welcome } exact/>)
          }
          {
            !auth && (<Route path='/' component= { Login } exact/>)
          }
          </Switch>
        </HashRouter>
        <h3>Register</h3>
        <h3>Login</h3>
      </nav>
  )
}

const mapStateToProps = ({shoes, auth}) =>{
  return{
    shoes,
    auth
  }
}

export default connect(mapStateToProps)(Header)