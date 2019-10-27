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
        const { lineItems, shoes } = this.props
        console.log(this.props);
        if (lineItems.length === null){
            return 'No Cart';
          }
        return( 
            <div>
                { 
                    lineItems.map(lineItem => {
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
