/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../store';
import {Card, CardContent, CardMedia, Button, Select, MenuItem, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

const sizeArray = () => {
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(6 + (i * 0.5));
  }
  return arr;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  linkButton:{
    textDecoration:'none',
    color:'white'
  },
  linkButton2:{
    textDecoration:'none',
    color:'black'
  },
  container:{
    background:'gray'
  },
  pic:{
    height:'40%',
    width:'80%'
  },
  fonts:{
    color:'white',
    fontWeight:'bold'
  },
  admin:{
    color:'red',
    textDecoration:'none'
  }
})

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
    const { createLineItem, updateLineItem, orders, lineItems, shoes, match, user, classes} = this.props;
    const { size } = this.state;
    const cart = orders.find(order => !(order.placed));
    
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id);
    const currItem = lineItems.find(item => (
        (cart.id === item.orderId) && (shoe.id === item.shoeId)
        && (parseInt(size, 10) === parseInt(item.size, 10))));
    
        if (currItem) {
          currItem.quantity = currItem.quantity *1
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
    const { shoes, match, deleteShoe, history, user, classes } = this.props;
    const shoe = shoes.find(_shoe => _shoe.id === match.params.id);
    if (!shoe){
      return '....loading';
    }
    const img = shoe.imageURL
    return (
      <div>
        <Card className={classes.container}>
          <CardContent>
            <CardMedia component='img' image={img} className={classes.pic}/>
        <Typography className={classes.fonts}>{shoe.name}: ${shoe.price}</Typography>
        <span>Size: </span>
        <Select value={this.state.size} onChange={(ev) => { this.setState({size: ev.target.value})}}>
          {sizes.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
        </Select>
        {
            user ? <Link to='/cart' className={classes.linkButton}><Button onClick={this.addToCart} >Add To Cart</Button></Link> : ''
        }
        </CardContent>
       </Card>
       {
          user && user.admin  ?
          <Button
            className={classes.admin}
            onClick={() => {
              deleteShoe(shoe);
              history.push('/');
            }}>Delete Shoe
          </Button>   : ''
        }
       {
          user && user.admin !== null && user.admin === true  ? <Link to={`/product/${shoe.id}/update`} style={{textDecoration:'none'}}><Button className={classes.admin}>Edit Shoe</Button></Link> : ''
        }
        <Button><Link to="/" className={classes.linkButton2}>View All Shoes</Link></Button>
      </div>
    )
  }
}

const mapStateToProps = ({shoes, user, orders, lineItems}) => ({shoes, user, orders, lineItems})

const mapDispatchToProps = (dispatch) => {
  return {
    deleteShoe: (shoe) => dispatch(actions.deleteShoe(shoe)),
    getShoes: () => dispatch(actions.getShoes()),
    createLineItem: (lineItem) => dispatch(actions.createLineItem(lineItem)),
    updateLineItem: (lineItem, update) => dispatch(actions.updateLineItem(lineItem, update)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Shoe))