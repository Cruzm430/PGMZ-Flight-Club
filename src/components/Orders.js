import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class Orders extends Component {
    componentDidMount() {
        console.log("this.props.user",this.props.user)
        console.log("this.props.orders",this.props.orders)
        this.props.getOrders(this.props.user)
    }
    render() {
        const { orders, shoes } = this.props
        console.log("orders", orders)
        if (orders.length === null){
            return 'No Orders';
          }
        return( 
            <div>
                { 
                    orders.map(order => {
                        return (<li key={order.id}> 
                            {
                                 order ? <div>{order.id}</div> : ''
                            }
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}

// class Orders extends Component {
//     constructor () {
//         super()
//             state: {
//                 orders
//             }
//         this.load = this.load.bind(this)
//         }
//     componentDidMount(){
//         // console.log('mounting',this.props)
    
//     }
//     componentDidUpdate(prevProps){
//         // if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
//         //     // console.log('updating')
//         //     this.load()
//         // }
//     }
//     async load() {
//         const {user} = this.props
//         console.log('loading', this.props.user)
//         return (await axios.get(`/orders/${user.id}`)).data
        
//         //will create an action in future
//         // console.log(this.props.cart)
//     }
//     async render() {
//         const {load} = this
//         const {user} = this.props
//         return( 
//             <div>
//                 { 
//                     orders.map(order => {
//                         return (<li key={order.id}> 
//                             <div>{order.Id}</div>
//                             </li>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
// }

const mapStateToProps = ({user, orders}, props) =>{
    return{
        user,
        orders,
        props
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getOrders: (user) => dispatch(actions.getOrders(user))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
