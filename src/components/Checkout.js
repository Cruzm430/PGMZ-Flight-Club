import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store'

class Checkout extends Component {
  constructor() {
    super();
    this.checkOut = this.checkOut.bind(this);
  }
  checkOut() {
    const { user, orders, createOrder, updateOrder } = this.props;
    const cart = orders.find(order => (!(order.placed) && order.userId === user.id))
    updateOrder(cart, {placed: true});
    createOrder({userId: user.id});
  }
  render() {
    return (
      <div>
        <button onClick={this.checkOut}>Check Out</button>
      </div>
    )
  }
}

const mapStateToProps = ({user, orders}) => {
  return {
    user,
    orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (order) => dispatch(actions.createOrder(order)),
    updateOrder: (order, update) => dispatch(actions.updateOrder(order, update))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
