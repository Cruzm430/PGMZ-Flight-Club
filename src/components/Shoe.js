/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../store';

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
      size: 0
    }
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getShoes();
  }
  componentDidUpdate() {
    if (!(this.state.size)) this.setState({size: 6});
    
  }
  addToCart() {
    const { createLineItem, updateLineItem, orders, lineItems, shoes, match, user} = this.props;
    const { size } = this.state;
    const cart = orders.find(order => !(order.placed));
    
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id);
    console.log("shoe",shoe)
    const currItem = lineItems.find(item => (
        (cart.id === item.orderId) && (shoe.id === item.shoeId)
        && (parseInt(size, 10) === parseInt(item.size, 10))));
    
        if (currItem) {
        updateLineItem(currItem, {quantity: currItem.quantity + 1});
        } else {
        createLineItem({
            orderId: cart.id,
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
    }
    return (
      <div>
        <img src={shoe.imageURL} alt={shoe.name} />
        <p>{shoe.name}: ${shoe.price}</p>
        <span>Size: </span>
        <select onChange={(ev) => { this.setState({size: ev.target.value})}}>
          {sizes.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        {
            user ? <button onClick={this.addToCart}>Add To Cart</button> : ''
        }
        {
          user.admin !== null && user.admin === true  ? <Link to={`/product/${shoe.id}/update`}><button style={{color: 'red'}}>Edit Shoe</button></Link> : ''
        }
        {
          user.admin ?
          <button
            style={{color: 'red'}}
            onClick={() => {
              deleteShoe(shoe);
              history.push('/');
            }}>Delete Shoe
          </button>   : ''
        }
       <Link to="/">View All Shoes</Link>
      </div>
    )
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
