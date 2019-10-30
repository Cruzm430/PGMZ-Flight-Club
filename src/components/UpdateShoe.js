import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Card, CardContent, TextField, Select, MenuItem, Typography, Button} from '@material-ui/core'

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
    if(ev.target.name === 'price'){
      value = value *1 
    }
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
          <Card>
            <CardContent>
            <TextField label='Shoe Name' name='name' placeholder={shoe.name} value={name} onChange={onChange}/>
            <br/>
            <TextField label='Shoe Price' name='price' placeholder={shoe.price} value={price} onChange={onChange}/>
            <br/>
          <TextField label='Image URL' value={imageURL} name='imageURL' placeholder={shoe.imageURL} onChange={onChange}/>
          <br/>
          <Typography>Category</Typography>
          <Select onChange={(ev)=>onChange(ev)}  name='categoryId' value={categoryId}>
            {
              categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
            }
          </Select>
          <Button onClick={onSubmit}>Update Shoe</Button>
            </CardContent>
          </Card>
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