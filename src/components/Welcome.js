import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 


class Welcome extends React.Component {
    constructor() {
        super();
    this.onClick = this.onClick.bind(this)
    }
    onClick() {
        this.props.logout()
    }
    render (){
        const { onClick } = this
        return (
            <div>
                <div>Welcome {this.props.user.name}</div>
                <button onClick={onClick}>Log Out</button>
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

