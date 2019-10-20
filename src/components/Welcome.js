import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 


class Welcome extends React.Component {
    
    render (){
        return (
            <div>
                <div>Welcome {this.props.auth.name}</div>
                <button>Log Out</button>
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
        dispatch 
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)