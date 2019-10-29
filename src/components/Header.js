import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link, HashRouter, Route} from 'react-router-dom';
import {actions} from '../store' 
import {AppBar, Toolbar, Typography, Button, MenuItem, MenuList, FormControl, Select, IconButton, InputBase, SwipeableDrawer, FormControlLabel, Switch, Divider, Menu
} from '@material-ui/core'
import { DUMMY_KEY } from '../store/constants';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title:{
    flexGrow:1,
  },
  testbar:{
    margin:0,
    paddingRight: 4,
    paddingLeft: 4,
    background:'gray'
  }
})

class Header extends Component{
  constructor(){
    super()
    this.state={
      searchText: '',
      categoryKey: '',
      open:false
    }
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onClick(){
    this.setState({[this.state.open]: !this.state.open}) 
  }
  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value })
    if(ev.target.name === 'categoryKey'){
      this.props.searchByCat(ev.target.value)
    }
  }
  render(){
    const {classes, user, searchByName } = this.props
    const { searchText } = this.state;
    const {pathname} = this.props.location

    let isAdmin
    let _user

    if(user){
      _user = user
      isAdmin = user.admin
    }

    return(
      <div className={classes.root}>
     <HashRouter>
<AppBar style={{margin:0}}>
  <Toolbar style={{justifyContent:'space-around', alignContent:'center'}}>
    {/* <IconButton
    edge='start'
    color='inherit'>
      <MenuIcon/>
    </IconButton> */}
    <Typography variant="h6">
      <Link to='/' className={classes.title} style={{textDecoration:'none', color:'white'}}>PGMZ Flight Club</Link>
    </Typography>
    {
      pathname === '/' ? <div>
      <SearchIcon/>
      <InputBase
      style={{background:'white', height:'15px'}}
      name='searchText'
      onChange={(ev)=>this.onChange(ev)}/>
          {/* <Button><Link to={`/orders`}>View Order History</Link></Button> */}
    <Button><Link to={'/cart'}>Cart</Link></Button>
    {isAdmin ? <Button><Link to='/add'>Create</Link></Button> : ''}
    {/* {isAdmin ? <Button><Link to='/pendingOrders'>Pending Orders</Link></Button> : ''} */}
    {/* <Button><Link to={'/checkout'}>Check Out</Link></Button> */}
      <Button onClick={() => this.props.searchByName(searchText)}>Search</Button>
      <FormControl>
      <Select
        name='categoryKey' value={this.state.categoryKey} onChange={(ev)=>this.onChange(ev)}>
          <MenuItem value=''></MenuItem>
          {
            this.props.categories.map(category=><MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
          }
      </Select>
      </FormControl></div> : ''
    }
    {
       user ? <Route path='/' component={Welcome}/> : <Route path='/' component={Login}/>
    }
  </Toolbar>
</AppBar>
</HashRouter> 
    </div>
    )
  }
}

{/* */}

// const Header = ({shoes, user})=>{
//   let isAdmin 
//   let _user
//   if(_user){
//     _user = user
//     isAdmin = user.admin
//     console.log(isAdmin)
//   }
//     return(
//       <div className={classes.root}>
//         <AppBar position='static'>
//           <Toolbar>
//         <HashRouter>
//           {
//               user ? <Route path='/' component={Welcome}/> : <Route path='/' component={Login}/>
//           }
//           {
//             isAdmin ? <Link to='/add'><Typography>Create</Typography></Link> : ''
//           }
//           <Button >
//             <Link to='/cart'>Cart</Link>
//           </Button>
//         </HashRouter>
//           </Toolbar>
//         </AppBar>
//       </div>
//     )
//   }

const mapStateToProps = ({shoes, user, categories},props) =>{
  return{
    shoes,
    categories,
    user,props
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      logout: (user) => dispatch(actions.logout(user)),
      searchByName: (searchText) => dispatch(actions.searchByName(searchText)),
      searchByCat: (categoryKey) => {
        dispatch(actions.searchByCat(categoryKey))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))