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
        this.load = this.load.bind(this)
    }
    componentDidMount(){
        // console.log('mounting',this.props)
       if(this.props.user !== "") {
           this.load()
       }
       
    }
    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            // console.log('updating')
            this.load()
        }
    }
    async load() {
        // console.log('loading', this.props.user)
        //will create an action in future
        this.props.updateCart(this.props.user)
        // console.log(this.props.cart)
    }
    render() {
        const { cart } = this.props
        console.log('cart',cart)
        return( 
            <div>
                { 
                    cart.map(lineItem => {
                        return (<li key={lineItem.id}> 
                            <div>{lineItem.name} {lineItem.size} {lineItem.quantity}</div>
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}
  

const mapStateToProps = ({user, cart}, props) =>{
    return{
        user,
        cart,
        props
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateCart: (user) => dispatch(actions.updateCart(user))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
