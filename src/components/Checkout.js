import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store'

class Checkout extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.checkOut = this.checkOut.bind(this);
    this.getCart = this.getCart.bind(this);
  }
  getCart() {
    const { user, orders } = this.props;
    return orders.find(order => (!(order.placed) && order.userId === user.id))
  }
  getLineItems() {
    const { lineItems } = this.props;
    const cart = this.getCart();
    return lineItems.filter(item => item.orderId === cart.id);
  }
  checkOut() {
    const { user, createOrder, updateOrder } = this.props;
    const cart = this.getCart();
    updateOrder(cart, {placed: true});
    createOrder({userId: user.id});
  }
  render() {
    const cartItems = this.getLineItems();
    return (
      <div>
        <button onClick={this.checkOut}>Check Out</button>
      </div>
    )
  }
}

const mapStateToProps = ({user, orders, lineItems}) => {
  return {
    user,
    orders,
    lineItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (order) => dispatch(actions.createOrder(order)),
    updateOrder: (order, update) => dispatch(actions.updateOrder(order, update))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
