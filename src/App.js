import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';
import Header from './Components/Header';
import AddShoe from './Components/AddShoe';
import Search from './Components/Search';
import CatFilter from './Components/CatFilter';
import Shoe from './Components/Shoe';
import Orders from './Components/Orders';
import UpdateShoe from './Components/UpdateShoe';
import Cart from './Components/Cart';
//can we refactor these?

class App extends Component{
  componentDidMount(){
    this.props.getShoes()
    this.props.getCategories()
    this.props.attemptSessionLogin()
    this.props.getOrders(this.props.user)
        .catch(ex => console.log(ex));
  }
  render(){
    console.log(this.props.cart)
    return (
      <HashRouter>
        <Route component={Header}/>
        <Route component={CatFilter}/>
        <Route component={Search}/>
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/add' component={AddShoe}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/orders' component={Orders} />
          <Route exact path='/product/:id' component={Shoe} />
          <Route path='/product/:id/update' component={UpdateShoe}/>
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = ({ users, shoes, categories, orders}, props)=>{
  return{
    users,
    shoes, 
    categories,
    orders,
    props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    getShoes: () => dispatch(actions.getShoes()),
    getCategories: () => dispatch(actions.getCategories()),
    getOrders: (user) => dispatch(actions.getOrders(user)),
    attemptSessionLogin: () => dispatch(actions.attemptSessionLogin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
