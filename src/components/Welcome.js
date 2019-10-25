import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import AddShoe from './AddShoe'
import { Link } from 'react-router-dom';

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
        return (
            <div>
                <div>Welcome {user.name}</div>
                <Link to={`/users/${user.id}/orders`}>View Order History</Link>
                {/* <div>{(this.props.user.admin === true) ? <AddShoe/> : ""}</div> */}
                <button onClick={logOut}>Log Out</button>
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

