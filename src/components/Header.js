import React from 'react';
import {Link, HashRouter, Route, Switch  } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'
import AddShoe from './AddShoe'
import Cart from './Cart'


const Header = ({shoes, user})=>{
  let isAdmin 
  let _user
  if(_user){
    _user = user
    isAdmin = user.admin
    console.log(isAdmin)
  }
    return(
      <div>
        <AppBar position='static'>
          <Toolbar variant='dense'>
        <HashRouter>
            {
              user ? <Route path='/' component={Welcome}/> : <Route path='/' component={Login}/>
            }
            {
            isAdmin ? <Link to='/add'><Typography>Create</Typography></Link> : ''
            }
        </HashRouter>
          </Toolbar>
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