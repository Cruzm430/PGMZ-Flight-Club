import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';
import Header from './Components/Header'
import AddShoe from './Components/AddShoe'
import Search from './Components/Search'
import CatFilter from './Components/CatFilter'
import Shoe from './Components/Shoe'
//can we refactor these?

class App extends Component{
  componentDidMount(){
    this.props.getShoes();
    this.props.getCategories()
  }
  render(){
    return (
      <div>
        <Search />
        <CatFilter />
        <HashRouter>
          <Route component={Header}/>
          <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/add' component={AddShoe}/>
          <Route path='/product/:id' component={Shoe} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

const mapStateToProps = ({email, password, users, shoes, categories})=>{
  return{
    users,
    shoes, 
    categories,
    email,
    password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    getShoes: () => dispatch(actions.getShoes()),
    getCategories: () => dispatch(actions.getCategories())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
