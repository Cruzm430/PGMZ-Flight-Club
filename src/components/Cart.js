
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Link} from 'react-router-dom'
import {TextField, Card, CardContent, Button, Typography, CardMedia} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

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
            edit:false
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
        const { lineItems, shoes, orders, user, classes } = this.props;
        if (!orders.length || !user) {
            return <Typography>Please sign in</Typography>;
        }
        const cart = orders.find(order => !(order.placed));
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
                <Link to='/checkout' style={{textDecoration:'none'}}><Button>
                    Check Out
                  </Button></Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart))