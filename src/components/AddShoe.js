import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store'

class AddShoe extends Component{
  constructor(){
    super();
    this.state={
      imageURL:'',
      name:'',
      price:'',
      category:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(ev){
    const {imageURL, name, price, category} = this.state
    this.props.createShoe({imageURL, name, price, category})
  }
  onChange(ev){
    let value = ev.target.value
    this.setState({[ev.target.name]: value})
    console.log(this.state)
  }
  render(){
    const {imageURL, name, price, category} = this.state
    const {onChange, onSubmit} = this
    return(
      <div>
        <label> Image URL
          <input name='imageURL' onChange={onChange} value={imageURL}/>
        </label>
        <label> Name
          <input name='name' onChange={onChange} value={name}/>
        </label>
        <label> Price
          <input name='price' onChange={onChange} value={price}/>
        </label>
        <label>Category
          <input name='category' onChange={onChange} value={category}/>
        </label>
        <button onClick={onSubmit}>Create Shoe</button>
      </div>
    )
  }
}

const mapStateToProps = ({shoes}) =>{
  return{
    shoes
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    createShoe: (shoe) => dispatch(actions.createShoe(shoe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShoe)
