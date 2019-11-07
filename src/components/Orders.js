import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'


class Orders extends Component {
    componentDidMount() {
        console.log("this.props.user",this.props.user)
        console.log("this.props.orders",this.props.orders)
        this.props.getOrders(this.props.user)
    }
    render() {
        const { orders, shoes, lineItems } = this.props
        const prevOrders = orders.filter(order => order.placed)
        const orderInvoices = prevOrders.map(order=>lineItems.filter(lineItem=>lineItem.orderId === order.id))
        const prevOrderDates = prevOrders.map(order=>order.createdAt.slice(0,10))
        let total = 0
        if (orders.length === null){
            return 'No Orders';
          }
        return( 
            <div>
               {
                   orderInvoices.map((order,idx)=>{
                       let date = prevOrderDates[idx]
                       return (
                        <Card key={idx}> 
                            <CardContent>
                            {
                                date  ?  <Typography>Ordered on: {date}</Typography> : ''
                            }
                        {
                           order.map(li=>{
                               const img = li.shoe.imageURL
                               total += li.shoe.price * li.quantity*1
                            return (
                            <Card key={li.id}>
                                <CardContent>
                                    <Typography>
                                        Shoe: {li.shoe.name}
                                        <br/>
                                        Quantity: {li.quantity}
                                        <br/>
                                        Price: ${li.shoe.price * li.quantity}
                                        
                                    </Typography>
                                    <img src={img} style={{height:'120px', width:'150px'}}/>
                                </CardContent>
                            </Card>)
                            })
                       }
                       </CardContent>
                       </Card>
                       )
                   })
               }
            </div>
        )
    }
}


{/* <Card>
{ 
    prevOrders.map(order => {
        return (<Card key={order.id}> 
        <CardContent>
        <Typography>                        Completed on {order.createdAt.slice(0,10)}</Typography>
        {
            orderInvoices.map(order=>{
                return(
                    <div>Order1</div>
                )
            })
        }
            </CardContent>
            </Card>
        )
    })
}
</Card> */}
// {
//     orderInvoices.map((invoice, idx)=>{
//         <Card key={invoice[idx].id}><CardContent><Typography>
//     Shoe: {invoice[idx].shoe.name}
//     <br/>
//     Quantity: {invoice[idx].quantity}
//     <br/>
//     Price: ${invoice[idx].quantity * invoice[idx].shoe.price}
//     </Typography>
//     <CardMedia image={invoice[idx].shoe.imageURL} style={{height:'100px', width:'200px'}}/></CardContent></Card>
//     })
// }

                
const mapStateToProps = ({user, orders, lineItems}, props) =>{
    return{
        user,
        orders,
        lineItems,
        props
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getOrders: (user) => dispatch(actions.getOrders(user))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
