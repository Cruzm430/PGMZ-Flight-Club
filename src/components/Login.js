import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store';
import {TextField, Button, Typography, Card, CardContent, FormControl} from '@material-ui/core'
import {Link} from 'react-router-dom'


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
      console.log(this.state)  
    }
    render(){
        const { onChange, onSubmit } = this
        return ( 
          <div >
            <Card style={{paddingTop:'10%', paddingLeft: '30%'}}>    
              <CardContent>
              <Typography>Log in with your account!</Typography>
              <FormControl>
                <TextField
                 type="text"
                 label='Email' 
                 onChange={onChange} 
                 name="email" />
                <br/>
                <TextField 
                style={{paddingBottom:'30px'}}
                type="password"
                label='Password' 
                onChange={onChange} 
                name="password" />
                <br/>
                </FormControl>
                
                <Button 
                style={{marginTop: '1.5'}}
                onClick={onSubmit}
                value="Login" 
                variant='contained'><Link to='/' style={{textDecoration:'none', color:'black'}}>Log In</Link></Button>
                </CardContent>
            </Card> 
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