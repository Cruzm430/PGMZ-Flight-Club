import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import AddShoe from './AddShoe'
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'

class Welcome extends React.Component{
    constructor() {
        super();
    this.logOut = this.logOut.bind(this)
    }
    logOut() {
        this.props.logout()
    }
    render (){
        const { logOut, addShoe } = this;
        const { user } = this.props;
        const { onClick } = this
        return (
            <div>
                <div>Welcome {user.name}</div>
                <Link to='/' style={{textDecoration:'none'}}><Button onClick={logOut}>Log Out</Button></Link>
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

