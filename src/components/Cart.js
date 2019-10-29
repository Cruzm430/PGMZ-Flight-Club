import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Link} from 'react-router-dom'
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel, Typography} from '@material-ui/core'
// import { json } from 'sequelize/types';

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
        const { lineItems, shoes, user } = this.props
        console.log(lineItems)
        if (lineItems.length === null){
            return 'No Cart';
          }
        return( 
            <Card>
                <CardContent>
                    <Typography>{user.name}'s Cart</Typography>
                    {
                        lineItems.map(lineItem=> {
                            const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId)
                            if(!lineItem.quantity && !this.state.edit){
                                this.props.deleteLineItem(lineItem)
                            }
                            return(<Card key={lineItem.id}>
                                <CardContent>
                                {
                                    shoe ? <Typography> {shoe.name} </Typography> : '' 
                                }
                                <Typography>Size: {lineItem.size}</Typography>
                                {
                                    this.state.edit ? <TextField
                                    name='quantity'
                                    type='number'
                                    defaultValue={lineItem.quantity.toString()}
                                    placeholder={lineItem.quantity.toString()}
                                    onChange={(ev)=>this.onUpdate(ev.target.value, lineItem)}
                                    /> :   <Typography>Quantity: {lineItem.quantity}</Typography>
                                }
                                <Button onClick={()=>this.props.deleteLineItem(lineItem)}>x</Button>
                                </CardContent>
                            </Card>)
                        })
                    }
                </CardContent>
                <Button onClick={this.onClick}>
                    {
                    this.state.edit ? <Typography>Save Order</Typography> : <Typography>Edit Order</Typography>
                    }
                </Button>
                <Button><Link to={'/checkout'}>Check Out</Link></Button>
            </Card>
        )
    }
}

const mapStateToProps = ({user, lineItems, shoes}, props) =>{
    return{
        shoes,
        user,
        lineItems,
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
