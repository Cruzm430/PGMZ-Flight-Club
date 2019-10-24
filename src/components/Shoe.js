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
  }
  componentDidMount() {
    this.props.getShoes();
  }
  componentDidUpdate() {
    if (!(this.state.size)) this.setState({size: 6});
  }
  render() {
    const sizes = sizeArray();
    const { shoes, match, deleteShoe, history } = this.props;
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
        <button>Add To Cart</button>
        <Link to={`/product/${shoe.id}/update`}><button style={{color: 'red'}}>Edit Shoe</button></Link>
        <button 
          style={{color: 'red'}} 
          onClick={() => {
            deleteShoe(shoe);
            history.push('/');
          }}>Delete Shoe
        </button>
      </div>
    )
  }
}

export default connect(({shoes}) => {
  return {
    shoes
  }
}, (dispatch) => {
  return {
    deleteShoe: (shoe) => dispatch(actions.deleteShoe(shoe)),
    getShoes: () => dispatch(actions.getShoes())
  }
})(Shoe);