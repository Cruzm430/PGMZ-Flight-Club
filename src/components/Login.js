import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 


class Login extends React.Component{
    constructor(){
        super();
        this.state= {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(ev){
      ev.preventDefault()
      const {email, password} = this.state
      this.props.attemptLogin({email, password})
      this.setState({email:'', password:''})
    }
    onChange(ev){
      let value = ev.target.value
      this.setState({[ev.target.name]: value})   
    }
    render(){
        const { onChange, onSubmit } = this
        return ( 
          <div>
            <p>Login</p>
            <form>
                <input type="text" onChange={onChange} name="email" />
                <input type="text" onChange={onChange} name="password" />
                <button onClick={onSubmit} value="Login">Log In</button>
            </form> 
          </div>    
        )
    }  
  }

  const mapStateToProps = ({email, password}, props) =>{
    return{
      props
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      attemptLogin: (email, password) => {
        dispatch(actions.attemptLogin(email, password))
        }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Login)