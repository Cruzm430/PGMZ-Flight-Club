import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import Home from './Home'
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

class Welcome extends React.Component{
    constructor() {
        super();
    this.logOut = this.logOut.bind(this)
    }
    logOut() {
        this.props.logout()
    }
    render (){
        const { logOut } = this;
        const { user } = this.props;
        const { onClick } = this
        let isAdmin
        let _user
    
        if(_user){
          _user = user
          isAdmin = user.admin
        }
        return (
            <div>
                <Typography>Welcome {user.name}</Typography>
                <Button onClick={logOut} href='/'>Log Out</Button>
            </div>
        )
    }
}

const mapStateToProps = ({user}, props) =>{
    return{
        user,
        props
    }
}
  
  const mapDispatchToProps = (dispatch) =>{
    return{
        logout: (user) => {
            dispatch(actions.logout(user))
        } 
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

