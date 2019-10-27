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
        const { logOut } = this;
        const { user } = this.props;
        const { onClick } = this
        let isAdmin = user.admin
        return (
            <div>
                <div>Welcome {user.name}</div>
                <Link to={`/orders`}>View Order History</Link>
                {/* <div>{(this.props.user.admin === true) ? <AddShoe/> : ""}</div> */}
                <Link to={'/cart'}>Cart</Link>
                {isAdmin ? <Link to='/add'>Create</Link> : ''}
                {isAdmin ? <Link to='/pendingOrders'>Pending Orders</Link> : ''}
                <button onClick={logOut}>Log Out</button>
                <Link to={'/checkout'}>Check Out</Link>
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

