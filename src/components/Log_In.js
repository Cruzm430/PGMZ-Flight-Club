import React from 'react';
import { connect } from 'react-redux';

class Log_In extends React.Component {
    render () {
        const { attemptLogin } = this.props;
        console.log(this.props)
            return (     
                <form>
                    <input type="text" id="username" placeholder="username"/>
                    <input type="text" id="password" placeholder="password"/>
                    <button onClick={ () => attemptLogin({
                        username: document.getElementById('username'),
                        password: document.getElementById('password')
                })} value="Log In"/>
                </form> 
            )
    }  
}



export default Log_In