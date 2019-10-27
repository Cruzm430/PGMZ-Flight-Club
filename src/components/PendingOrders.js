import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actions} from '../store' 

// const PendingOrders = ({user, orders}) => {
//     const incOrders = orders.filter(order => !order.placed)
//     console.log
//     return(
//       <div>
//         {
//           incOrders.map(order=><div key={order.id}>
//             <h3>Order Created At:{order.createdAt}</h3>
//             <h3>By: {order.name}</h3>

//           </div>)
//         }
//       </div>
//     )
// }

class PendingOrders extends Component{
  constructor(){
    super()
  }
  render(){
    console.log(this.props.user)
    return(
      <div>
        haaay
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

const mapDispatchToProps = (dispatch) => {
  return{
    updateCart: (user) => dispatch(actions.updateCart(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PendingOrders)