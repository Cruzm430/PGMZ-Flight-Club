import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel} from '@material-ui/core'
import axios from 'axios'
// import { json } from 'sequelize/types';
import { loadavg } from 'os';

class Cart extends Component {
    constructor () {
        super()
        // this.load = this.load.bind(this)
    }
    render() {
        const { lineItems, shoes, orders } = this.props;
        if (!orders.length) {
            return '...loading';
        }
        const cart = orders.find(order => !(order.placed));
        console.log(lineItems);
        const cartItems = lineItems.filter(item => item.orderId === cart.id);
        return( 
            <div>
                { 
                    lineItems.filter(item => item.orderId === cart.id)
                        .map(lineItem => {
                        const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId);
                        return (<li key={lineItem.id}> 
                            <div>
                            {
                                 shoe ? <div>{shoe.name}</div> : ''
                            }
                            </div><div> {lineItem.size} {lineItem.quantity}</div>
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}
  

const mapStateToProps = ({user, lineItems, shoes, orders}, props) =>{
    return{
        shoes,
        user,
        lineItems,
        orders,
        props
    }
}


export default connect(mapStateToProps, null)(Cart)
