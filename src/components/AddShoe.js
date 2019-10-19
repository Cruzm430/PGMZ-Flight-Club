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
      categoryId:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(ev){
    const {imageURL, name, price, category} = this.state
    this.props.createShoe({imageURL, name, price, category})
    .then(this.setState({imageURL:'', name:'', price:'', categoryId:''}))
    .then(this.props.history.push('/'))
  }
  onChange(ev){
    let value = ev.target.value
    this.setState({[ev.target.name]: value})
    //console.log(this.state)
    //console.log(this.props)
  }
  render(){
    const {imageURL, name, price} = this.state
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
          <select onChange={onChange} name='categoryId'>
            {
              this.props.categories.map(category =><option key={category.id} value={category.id}>{category.name}</option>)
            }
          </select>
        </label>
        <button onClick={onSubmit}>Create Shoe</button>
      </div>
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
    createShoe: (shoe) => dispatch(actions.createShoe(shoe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShoe)
