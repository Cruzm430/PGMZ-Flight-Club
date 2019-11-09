import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './components/Home';
import Header from './components/Header';
import AddShoe from './components/AddShoe';
import Search from './components/Search';
import CatFilter from './components/CatFilter';
import Shoe from './components/Shoe';
import Login from './components/Login';
import Orders from './components/Orders';
import UpdateShoe from './components/UpdateShoe';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
//can we refactor these?

class App extends Component{
  componentDidMount(){
    this.props.getShoes()
    this.props.getCategories()
    this.props.attemptSessionLogin()
    this.props.getLineItems()
    .catch(ex => console.log(ex));
    console.log("orders",this.props.orders)
  }
  render(){
    const {getOrders, user} = this.props;
    try {
      if (user) getOrders(user);
    } catch {
      console.log('No one logged in, or still loading');
    }
    return (
      <HashRouter>
        <Route component={Header}/>
        {/* <Route component={CatFilter}/>
        <Route component={Search}/> */}
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/add' component={AddShoe}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/login' component={Login}/>
          <Route exact path='/product/:id' component={Shoe} />
          <Route path='/product/:id/update' component={UpdateShoe}/>
          {/* <Route path='/checkout' component={Checkout} /> */}
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = ({ users, shoes, categories, orders, lineItems, user}, props)=>{
  return{
    users,
    shoes,
    categories,
    orders,
    lineItems,
    user,
    props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    getShoes: () => dispatch(actions.getShoes()),
    getCategories: () => dispatch(actions.getCategories()),
    getLineItems: () => dispatch(actions.getLineItems()),
    getOrders: (user) => dispatch(actions.getOrders(user)),
    attemptSessionLogin: () => dispatch(actions.attemptSessionLogin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)