import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel} from '@material-ui/core'

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
    const {imageURL, name, price, categoryId} = this.state
    this.props.createShoe({imageURL, name, price, categoryId})
    .then(this.props.history.push('/'))
  }
  onChange(ev){
    let value = ev.target.value
    this.setState({[ev.target.name]: value})
  }
  render(){
    const {imageURL, name, price, categoryId} = this.state
    const {onChange, onSubmit} = this
    const {categories} = this.props
    return(
      <div>
          <Card>
            <CardContent>

            <TextField
            label='Shoe Name'
            name='name'
            value={name}
            onChange={onChange}
            style={{width:'40%'}}
            />
            <br/>
            <TextField
            label='Shoe Price'
            name='price'
            value={price}
            onChange={onChange}
            style={{width:'40%'}}
            />
            <br/>
            <TextField
            label='Shoe Image'
            name='imageURL'
            value={imageURL}
            onChange={onChange}
            style={{width:'40%'}}
            />
            <br/>
            <FormControl style={{minWidth:'40%'}}>
              <InputLabel>Category</InputLabel>
              <Select name='categoryId' value={categoryId} onChange={onChange}style={{width:'40%'}}>
                {
                  categories.map(category=><MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>)
                }
              </Select>
            </FormControl>
            </CardContent>
            <Button variant='contained' onClick={onSubmit}>Add Shoe</Button>
          </Card>
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

{/* <div>
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
      </div> */}