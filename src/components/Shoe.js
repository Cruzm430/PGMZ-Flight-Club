/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../store';
import { CardMedia, Grid, Button, Card, CardContent, Typography, Select, MenuItem } from '@material-ui/core';

const sizeArray = () => {
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(6 + (i * 0.5));
  }
  return arr;
}

class Shoe extends Component {
  constructor() {
    super();
    this.state = {
      size: ''
    }
    this.addToCart = this.addToCart.bind(this);
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    this.props.getShoes();
  }
  componentDidUpdate() {
    if (!(this.state.size)) this.setState({size: 6}); 
  }
  onChange(ev){
    this.setState({size: ev.target.value})
  }
  addToCart() {
    const { createLineItem, updateLineItem, orders, lineItems, shoes, match, user, cart } = this.props;
    const { size } = this.state;
    
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id);
    console.log("shoe",shoe)
    const orderId = lineItems[0].orderId
    const currItem = lineItems.find(item => (
        (shoe.id === item.shoeId) && (parseInt(size, 10) === parseInt(item.size, 10))));
    
        if (currItem) {
          currItem.quantity = currItem.quantity *1
        updateLineItem(currItem, {quantity: currItem.quantity + 1})
        } else {
        createLineItem({
            orderId: orderId,
            shoeId: shoe.id,
            quantity: 1,
            size: size,
            name: shoe.name
        });
        }
  }

  render() {
    const sizes = sizeArray();
    const { shoes, match, deleteShoe, history, user } = this.props;
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id);
    
    if (!shoe){
      return '....loading';
    }else{
      const img = shoe.imageURL
    return (
      <div>
        <Grid container style={{height:'80%', width:'80%', justifyContent:'center'}}>
          <Grid item>
        <Card>
              <CardContent>
                <CardMedia component='img' image={img}/>
              </CardContent>
            </Card>
            </Grid>
        <Grid item style={{paddingTop: '10px'}}>
        <Card style={{background:'lightGray'}}>
          <CardContent>
        <Typography style={{margin:'0'}}>{shoe.name}: ${shoe.price}</Typography>
        <br/>
        <Select style={{padding:'10px'}} value={this.state.size} onChange={(ev) => this.onChange(ev)} >
          {sizes.map(size => <MenuItem key={size} value={size}>Size: {size}</MenuItem>)}
        </Select>
        {
            user ? <Button onClick={this.addToCart}>Add To Cart</Button> : ''
        }
        <Link to='/checkout' style={{textDecoration:'none'}}><Button >Checkout</Button></Link>
        <Link to="/" style={{textDecoration:'none'}}><Button>View All Shoes</Button></Link>
          </CardContent>
       </Card>
       </Grid>
       {
          user.admin !== null && user.admin === true  ? <Link style={{textDecoration:'none'}} to={`/product/${shoe.id}/update`}><Button style={{textDecoration:'none', color: 'red'}}>Edit Shoe</Button></Link> : ''
        }
        {
          user.admin ?
          <Button
            style={{color: 'red'}}
            onClick={() => {
              deleteShoe(shoe);
              history.push('/');
            }}>Delete Shoe
          </Button>   : ''
        }
       </Grid>
      </div>
    )
  }
}
}

export default connect(({shoes, user, orders, lineItems}) => {
  return {
    shoes,
    user,
    orders,
    lineItems
  }
}, (dispatch) => {
  return {
    deleteShoe: (shoe) => dispatch(actions.deleteShoe(shoe)),
    getShoes: () => dispatch(actions.getShoes()),
    createLineItem: (lineItem) => dispatch(actions.createLineItem(lineItem)),
    updateLineItem: (lineItem, update) => dispatch(actions.updateLineItem(lineItem, update)),
    updateCart: (user) => dispatch(actions.updateCart(user))
  }
})(Shoe);
