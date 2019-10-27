import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {TextField, Card, CardContent, Button, FormControl, MenuItem, Select, InputLabel, Typography} from '@material-ui/core'
// import { json } from 'sequelize/types';

const sizeArray = () => {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push(6 + (i * 0.5));
    }
    return arr;
  }


  class Cart extends Component {
      constructor(){
          super()
      }
      render(){
          console.log(this.props.lineItems)
          return(
              <hr/>
          )
      }
  }
// class Cart extends Component {
//     constructor () {
//         super()
//         this.load = this.load.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.state={
//             cart:{}
//         }
//     }
//     componentDidMount(){
//         // console.log('mounting',this.props)
//        if(this.props.user !== "") {
//            const cart = this.load()
//            this.setState({cart})
//        }
//     }
//     componentDidUpdate(prevProps){
//         console.log(prevProps)
//         if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
//             // console.log('updating')
//             this.load()
//             this.setState({cart})
//         }
//     }
//     async load() {
//         // console.log('loading', this.props.user)
//         //will create an action in future
//         this.props.updateCart(this.props.user)
//         // console.log(this.props.cart)
//     }
//     onChange(ev){
//         return null
//     }
//     onClick(lineItem){
//         this.props.deleteLineItem(lineItem)
//     }
//     render() {
//         const { user } = this.props
//         const arr = sizeArray()
//             return(
//                 null
//                 // <Card>
//                 //     <CardContent>
//                 //         <Typography>{this.props.user.name}'s Order</Typography>
//                 //         {
//                 //         cart.map(lineItem=> <Card key={lineItem.id} style={{width:'50%', margin:'10px'}}>
//                 //             <CardContent>{lineItem.name}    
//                 //             <TextField
//                 //             label='Quantity'
//                 //             onChange={this.onChange}
//                 //             />
//                 //             </CardContent>
//                 //             <Button onClick={()=>this.onClick(lineItem)}>x</Button>
//                 //         </Card>)
//                 //     }
//                 //     </CardContent>
//                 // </Card>
//         )
//     }
// }

  

const mapStateToProps = ({user, cart, lineItems}, props) =>{
    return{
        user,
        cart,
        lineItems,
        props
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateCart: (user) => dispatch(actions.updateCart(user)),
        deleteLineItem: (lineItem) => dispatch(actions.deleteLineItem(lineItem))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
