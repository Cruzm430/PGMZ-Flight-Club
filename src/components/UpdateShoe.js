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
    this.onChange= this.onChange.bind(this)
    this.onSubmit= this.onSubmit.bind(this)
  }
  onChange(ev){
    let value = ev.target.value
    this.setState({[ev.target.name]: value})
    console.log(this.state)
  }
  onSubmit(){
    const {shoes, match, history} = this.props
    const {imageURL, name, price, categoryId} = this.state
    const shoe = shoes.find(_shoe=> _shoe.id === match.params.id)
    const update = {id:shoe.id, imageURL, name, price, categoryId}
    this.props.updateShoe(shoe, update)
      .then(history.push('/'))
  }
  render(){
    const {onChange, onSubmit} = this
    const {shoes, match, history, categories} = this.props
    const {name, price, imageURL, categoryId} = this.state
    const shoe = shoes.find(_shoe=> _shoe.id === match.params.id)
    if(shoe){
      return(
        <div>
          <label>
            <input placeholder={shoe.name} name='name' value={name} onChange={onChange}/>
          </label>
          <label>
            <input placeholder={shoe.price} name='price' value={price} onChange={onChange}/>
          </label>
          <label>
            <input placeholder={shoe.imageURL} name='imageURL' value={imageURL} onChange={onChange}/>
          </label>
          <select onChange={onChange} name='categoryId' value={categoryId}>
            {
              categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
            }
          </select>
          <button onClick={onSubmit}>Update Shoe</button>
        </div>
      )
    }
    else{
      return(
        <h1>LOAAADING</h1>
      )
    }
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
    updateShoe: (shoe, update) => dispatch(actions.updateShoe(shoe,update))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShoe)