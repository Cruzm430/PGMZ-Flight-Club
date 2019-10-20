import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';
import Header from './Components/Header'
import AddShoe from './Components/AddShoe'
import Search from './Components/Search'
import CatFilter from './Components/CatFilter'

class App extends Component{
  componentDidMount(){
    this.props.getShoes()
    this.props.getCategories()
    this.props.attemptSessionLogin()
    .catch(ex => console.log(ex));
  }
  render(){
    return(
      <HashRouter>
        <Route component={Header}/>
        <Route component={CatFilter}/>
        <Route component={Search}/>
        <Switch>
        <Route exact path='/' component={Home}/> 
        <Route exact path='/add' component={AddShoe}/>
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = ({ users, shoes, categories})=>{
  return{
    users,
    shoes, 
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    getShoes: () => dispatch(actions.getShoes()),
    getCategories: () => dispatch(actions.getCategories()),
    attemptSessionLogin: () => dispatch(actions.attemptSessionLogin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
