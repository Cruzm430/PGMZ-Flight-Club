import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import AddShoe from './AddShoe'

class Welcome extends React.Component{
    constructor() {
        super();
    this.onClick = this.onClick.bind(this)
    }
    onClick() {
        this.props.logout()
    }
    createShoe() {
        
    }
    render (){
        const { onClick, createShoe } = this
        return (
            <div>
                <div>Welcome {this.props.user.name}</div>
                {/* <div>{(this.props.user.admin === true) ? <AddShoe/> : ""}</div> */}
                {console.log(this.props.user.admin)}
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

