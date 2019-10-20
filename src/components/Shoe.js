import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  componentDidUpdate() {
    if (!(this.state.size)) this.setState({size: 6});
  }
  render() {
    const sizes = sizeArray();
    const { shoes, match } = this.props;
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id)
    return (
      <div>
        <img src={shoe.imageURL} alt={shoe.name} />
        <p>{shoe.name}: ${shoe.price}</p>
        <span>Size: </span>
        <select onChange={(ev) => { this.setState({size: ev.target.value})}}>
          {sizes.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        <button>Add To Cart</button>
        <button style='color:red'>Update Shoe</button>
        <button style='color:red'>Delete Shoe</button>
      </div>
    )
  }
}

export default connect(({shoes}) => {
  return {
    shoes
  }
}, null)(Shoe);