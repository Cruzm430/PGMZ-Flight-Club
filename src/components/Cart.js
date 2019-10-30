
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Link} from 'react-router-dom'
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel, Typography, CardMedia} from '@material-ui/core'

class Cart extends Component {
    constructor () {
        super()
        this.state={
            edit:true
        }
        this.onClick = this.onClick.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }
    onClick(){
        this.setState({edit:!this.state.edit})
    }
    onUpdate(ev, line){
        const update = ev*1
        this.props.updateLineItem(line, {quantity:update})
    }
    render() {
        const { lineItems, shoes, orders, user } = this.props;
        console.log(user)
        if (!orders.length) {
            return '...loading';
        }
        const cart = orders.find(order => !(order.placed));
        const cartItems = lineItems.filter(item => item.orderId === cart.id);
        if(!user){
            return(
                <Card style={{width:'100%', height:'100%'}}>
                    <CardContent>
                        <Typography>Nothing in your cart yet :(</Typography>
                    </CardContent>
                </Card>
            )
        }
        return( 
            <div style={{margin:0}}>
                <Card style={{width:'80%'}}>
                    <CardContent>
                        <Typography>{user.name}'s Cart</Typography>
                { 
                    lineItems.filter(item => item.orderId === cart.id)
                        .map(lineItem => {
                        const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId);
                        const img = shoe.imageURL
                        if(!lineItem.quantity && !this.state.edit){
                            this.props.deleteLineItem(lineItem)
                        }
                        return (
                        <Card key={lineItem.id}>
                            <CardContent > 
                            {
                                 shoe ? <Typography>{shoe.name}</Typography> : ''
                            }
                            <CardMedia component='img' src={img} style={{height:'25%', width:'35%'}}/>
                            <Typography> Size: {lineItem.size}  Price: ${shoe.price * lineItem.quantity}</Typography>
                            Quantity: 
                            {
                                    this.state.edit ? <TextField
                                    name='quantity'
                                    type='number'
                                    defaultValue={lineItem.quantity.toString()}
                                    placeholder={lineItem.quantity.toString()}
                                    style={{width:'50px'}}
                                    onChange={(ev)=>this.onUpdate(ev.target.value, lineItem)}
                                    /> :   <Typography>Quantity: {lineItem.quantity}</Typography>
                                }
                                <Button onClick={()=>this.props.deleteLineItem(lineItem)}>x</Button>
                            </CardContent>
                            <Button onClick={this.onClick}>
                    {
                    this.state.edit ? <Typography>Save Order</Typography> : <Typography>Edit Order</Typography>
                    }
                </Button>
                        </Card>
                        )
                    })
                }
                </CardContent>
                </Card>
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
const mapDispatchToProps = (dispatch) =>{
    return{
        deleteLineItem: (lineItem) => dispatch(actions.deleteLineItem(lineItem)),
        updateLineItem: (lineItem, update) => dispatch(actions.updateLineItem(lineItem,update)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)