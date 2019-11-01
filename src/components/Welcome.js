import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import { Link } from 'react-router-dom';
import {Button, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    linkButton:{
      textDecoration:'none',
      color:'white'
    }
})

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
        const { user, classes } = this.props;
        return (
            <div>
                <Typography>Welcome {user.name}</Typography>
                <Link to='/' className={classes.linkButton}><Button className={classes.linkButton}
                onClick={logOut}><Typography>Log Out</Typography></Button></Link>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Welcome))

