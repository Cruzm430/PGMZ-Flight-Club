import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {actions} from './store';
import {connect} from 'react-redux';
import Home from './Components/Home';

// class App extends Component{
//   render(){
//     return(
//       <hr/>
//     )
//   }
// }


// const App = () =>{
//   return (
//     null
//   )
// }

class App extends Component{
  componentDidMount(){
    //this.props.getUsers();
    this.props.getShoes();
    //this.props.getCategories();
  }
  render(){
    return(
      <HashRouter>
        <Route component={Home}/>
        {/* <Route/>
        <Route/>
        <Switch>
          
          <Route/>
          <Route/>
        </Switch> */}
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
