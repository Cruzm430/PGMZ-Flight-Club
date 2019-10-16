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
  }
  render(){
    return(
      <HashRouter>
        <Route component={Header}/>
        <Switch>
        <Route exact path='/' component={Home}/> 
        <Route exact path= '/hello' component={AddShoe}/>
        </Switch>
          {/*<Route/>
          <Route/>*/}
      </HashRouter>
    )
  }
}

const mapStateToProps = ({users, shoes, categories})=>{
  return{
    users,
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
