import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';
import Header from './Components/Header'
import AddShoe from './Components/AddShoe'
import Search from './Components/Search'

class App extends Component{
  componentDidMount(){
    this.props.getShoes();
    this.props.getCategories()
  }
  render(){
    console.log(this.props.categories)
    return(
      <div>
        <Search />
        <HashRouter>
          <Route component={Header}/>
          <Switch>
          <Route exact path='/' component={Home}/> 
          <Route exact path='/add' component={AddShoe}/>
          </Switch>
            {/*<Route/>
            <Route/>*/}
        </HashRouter>
      </div>
    )
  }
}

const mapStateToProps = ({users, shoes, categories})=>{
  return {
    users,
    shoes,
    categories
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
