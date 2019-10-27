import React, { Component } from 'react';
import { actions } from '../store';
import { connect } from 'react-redux';

class CartPreview extends Component {
  constructor() {
    super();
    this.state = {
      cartSize: 0
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = ({user, lineItems, orders}) => {
  return {
    user,
    lineItems,
    orders
  }
}

export default connect(mapStateToProps)(CartPreview);