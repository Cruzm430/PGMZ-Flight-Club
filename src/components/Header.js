import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({shoes}) => {
  return(
      <nav>
        <h1>PMGZ Flight Club</h1>
        <Link to='/hello'>Create</Link>
        <h3>Register</h3>
        <h3>Login</h3>
      </nav>
  )
}

const mapStateToProps = ({shoes}) =>{
  return{
    shoes
  }
}

export default connect(mapStateToProps)(Header)