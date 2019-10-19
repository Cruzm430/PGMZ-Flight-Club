import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';
import Header from './Components/Header'
import AddShoe from './Components/AddShoe'



class App extends Component{
  componentDidMount(){
    this.props.getShoes();
    this.props.getCategories()
  }
  render(){
    return(
      <HashRouter>
        <Route component={Header}/>
        <Switch>
        <Route exact path='/' component={Home}/> 
        <Route exact path='/add' component={AddShoe}/>
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = ({email, password, shoes, categories})=>{
  return{
    email,
    password,
    shoes,
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getUsers: () => dispatch(actions.getUsers()),
    getShoes: () => dispatch(actions.getShoes()),
    getCategories: () => dispatch(actions.getCategories())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
