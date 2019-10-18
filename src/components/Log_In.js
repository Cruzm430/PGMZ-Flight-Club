import React from 'react';
import { connect } from 'react-redux';


class _Login extends Component{
    constructor () 
        super{

        }
    render(){
                    const { attemptLogin } = this.props;
                    console.log(props)
                        return (     
                            <form>
                                <input type="text" id="email" placeholder="email"/>
                                <input type="text" id="password" placeholder="password"/>
                                <button onClick={ () => attemptLogin({
                                    username: document.getElementById('email'),
                                    password: document.getElementById('password')
                            })} value="Log In"/>
                            </form> 
                        )
                }  
  }
  
const Login = connect(
    ()=> {
      return {
  
      };
    },
    (dispatch, { history })=> {
      return {
        attemptLogin: (body)=> dispatch(actions.attemptLogin(username, history))
      
      }
    }
  )(_Login);





export default _Login