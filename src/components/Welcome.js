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
                <div>Welcome {this.props.auth.name}</div>
                <button onClick={onClick}>Log Out</button>
            </div>
        )
    }
}

const mapStateToProps = ({auth}, props) =>{
    return{
        auth,
        props
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
        logout: (auth) => {
            dispatch(actions.logout(auth))
        } 
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

