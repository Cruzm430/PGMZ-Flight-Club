import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel, Typography} from '@material-ui/core'
// import { json } from 'sequelize/types';

class Cart extends Component {
    constructor () {
        super()
        // this.load = this.load.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
        console.log('onClick')
    }
    render() {
        const { lineItems, shoes, user } = this.props
        if (lineItems.length === null){
            return 'No Cart';
          }
        return( 
            <div>
                { 
                    lineItems.map(lineItem => {
                        const shoe = shoes.find(_shoe => _shoe.id === lineItem.shoeId);
                        return (<div key={lineItem.id}> 
                            <div>
                            {
                                 shoe ? <div>{shoe.name}</div> : ''
                            }
                            </div><div> {lineItem.size} {lineItem.quantity}</div>
                            <button onClick={()=>this.props.deleteLineItem(lineItem)}>x</button>
                            </div>
                        )
                    })
                }
            </div>
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
