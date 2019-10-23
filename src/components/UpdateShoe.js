import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 

class UpdateShoe extends Component{
  constructor(){
    super()
    this.state={
      name:'',
      price:'',
      imageURL:'',
      categoryId:''
    }
  }
  render(){
    const {shoes, match, history} = this.props
    const shoe = shoes.find(_shoe=> _shoe.id === match.params.id)
    return(
      <h1>We IN HERE</h1>
    )
  }
}

const mapStateToProps = ({shoes, categories}, props) =>{
  return{
    shoes,
    categories,
    props
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateShoe: (shoe) => dispatch(actions.updateShoe({...shoe, changes}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShoe)