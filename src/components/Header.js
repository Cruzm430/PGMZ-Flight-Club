import React from 'react';
import {Link, HashRouter, Route, Switch  } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'
import AddShoe from './AddShoe'


const Header = ({shoes, user})=>{
    return(
      <div>
        <AppBar>
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

