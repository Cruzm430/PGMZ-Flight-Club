import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel} from '@material-ui/core'
import axios from 'axios'
// import { json } from 'sequelize/types';
import { loadavg } from 'os';
import { getLineItems } from '../store/actions';

class Cart extends Component {
    constructor () {
        super()
        // this.load = this.load.bind(this)
    }
    render() {
        console.log(this.props);
        const { lineItems, shoes, getOrders, user } = this.props
        
        if (!(lineItems.length)){
            //getOrders(user);
            return 'No Cart';
          }
        return(
            <div>
                { 
                    lineItems.map(lineItem => {
                        console.log("shoeArray", shoes)
                        const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId);
                        console.log("lineItemShoe", shoe)
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
  

const mapStateToProps = ({user, lineItems, orders, shoes}, props) =>{
    return{
        shoes,
        user,
        lineItems,
        orders,
        props
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: user => dispatch(actions.getOrders(user))
    }
}


export default connect(mapStateToProps, null)(Cart)
