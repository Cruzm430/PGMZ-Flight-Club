
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Link} from 'react-router-dom'
import {TextField, Card, CardContent, Button, Typography, CardMedia} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { typography } from '@material-ui/system';

const styles = theme => ({
    card:{
        width:'100%',
        height:'100%'
    },
    smallerCard:{
        width:'80%'
    },
    lineItem:{
        marginBottom:'30px'
    },
    pic:{
        height:'25%', 
        width:'35%'
    },
    textField:{
        width:'50px'
    },
    total:{
        paddingLeft:'80%',
        color:'red'
    }
})

class Cart extends Component {
    constructor () {
        super()
        this.state={
            edit:false,
            purchase:false,
        }
        this.onClick = this.onClick.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onClose = this.onClose.bind(this)
    }
    onClick(){
        this.setState({edit:!this.state.edit})
    }
    onUpdate(ev, line){
        const update = ev*1
        this.props.updateLineItem(line, {quantity:update})
    }
    onClose(){
        const {cart, updateOrder, createOrder, user} = this.props 
        updateOrder(cart, {placed: true});
        createOrder({userId: user.id});
    }
     handleToken(token, addresses){
        fetch('/checkout',{
            method:'POST',
            body:JSON.stringify(token),
        }).then(res =>{
            res.json().then(data => {
                alert('Bought! Ready for the next round?')
            })
        })
    }
    render() {
        const { lineItems, shoes, orders, user, classes, cart } = this.props;
        console.log(this.props)
        if (!orders.length || !user) {
            return <Typography>Please sign in</Typography>;
        }
        let total = 0
        if(!user){
            return(
                <Card className={classes.card}>
                    <CardContent>
                        <Typography>Nothing in your cart yet :(</Typography>
                    </CardContent>
                </Card>
            )
        }
        return( 
            <div >
                <Card className={classes.smallerCard}>
                    <CardContent>
                        <Typography>{user.name}'s Cart</Typography>
                { 
                    lineItems.filter(item => item.orderId === cart.id)
                        .map(lineItem => {
                        const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId);
                        const img = shoe.imageURL
                        total+=shoe.price*lineItem.quantity*1
                        const finalPrice = shoe.price * lineItem.quantity
                        if(!lineItem.quantity && !this.state.edit){
                            this.props.deleteLineItem(lineItem)
                        }
                        return (
                        <Card key={lineItem.id} className={classes.lineItem}>
                            <CardContent > 
                            {
                                 shoe ? <Typography>{shoe.name}</Typography> : ''
                            }
                            <CardMedia component='img' src={img}
                            className={classes.pic}/>
                            <Typography> Size: {lineItem.size}  Price: ${finalPrice}</Typography>
                            {
                                    this.state.edit ? <TextField
                                    name='quantity'
                                    type='number'
                                    label='Quantity:'
                                    defaultValue={lineItem.quantity.toString()}
                                    placeholder={lineItem.quantity.toString()}
                                    className={classes.textField}
                                    onChange={(ev)=>this.onUpdate(ev.target.value, lineItem)}
                                    /> :   <Typography>Quantity: {lineItem.quantity}</Typography>
                                }
                                <Button onClick={()=>this.props.deleteLineItem(lineItem)}>x</Button>
                            </CardContent>
                        </Card>
                        )
                    })
                }
                </CardContent>
                <Typography className={classes.total}>Total: ${total}</Typography>
                <Button onClick={this.onClick}>
                    {
                    this.state.edit ? <Typography>Save Order</Typography> : <Typography>Edit Order</Typography>
                    }
                </Button>
                <StripeCheckout
                stripeKey='pk_test_Go6vFW40jdP1LXm3yHP8Adrd0038lBYP6L'
                token={this.handleToken}
                amount = {total * 100}
                billingAddress
                shippingAddress
                closed={this.onClose}/>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = ({user, lineItems, shoes, orders}, props) =>{
    const cart = orders.find(order => !(order.placed))
    return{
        shoes,
        user,
        lineItems,
        orders,
        cart,
        props
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        deleteLineItem: (lineItem) => dispatch(actions.deleteLineItem(lineItem)),
        updateLineItem: (lineItem, update) => dispatch(actions.updateLineItem(lineItem,update)),
        updateOrder: (order, update) => dispatch(actions.updateOrder(order, update)),
        createOrder: (order) => dispatch(actions.createOrder(order)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart))