import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link, HashRouter, Route} from 'react-router-dom';
import {actions} from '../store' 
import {AppBar, Toolbar, Typography, Button, MenuItem, MenuList, FormControl, Select, TextField
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
    paddingBottom:'100px'
  },
  title:{
    flexGrow:1,
  },
  testbar:{
    margin:0,
    paddingRight: 4,
    paddingLeft: 4,
    background:'gray',
    margin:0
  },
  linkButton:{
    textDecoration:'none',
    color:'white'
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
    const {classes, user, searchByName, lineItems, orders } = this.props
    const { searchText } = this.state;
    const {pathname} = this.props.location

    let isAdmin
    if(user){
      isAdmin = user.admin
    }

    return(
      <div className={classes.root}>
        <HashRouter>
          <AppBar className={classes.testbar}>
            <Toolbar>
            <Typography variant="h6">
            <Link to='/' className={classes.title} className={classes.linkButton}>PGMZ Flight Club</Link>
            </Typography>
              {
                pathname === '/' ? <div>
                <SearchIcon/>
                <TextField
                name='searchText'
                onChange={(ev)=>this.onChange(ev)}/>
                <Button onClick={() => this.props.searchByName(searchText)}>Search</Button>
                <FormControl>
                <Select
                  name='categoryKey' value={this.state.categoryKey} onChange={(ev)=>this.onChange(ev)}>
                    <MenuItem defaultValue='Search by Category'>Filter by Category</MenuItem>
                    {
                      this.props.categories.map(category=><MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
                    }
                </Select>
                </FormControl></div> : ''
              }
              <Button><Link to={'/cart'} className={classes.linkButton}>Cart</Link></Button>
              {isAdmin ? <Button><Link to='/add' className={classes.linkButton}>Create</Link></Button> : ''}
              {user ? <Button><Link to={`/orders`} className={classes.linkButton}>Order History</Link></Button> : ''}
              {pathname !== '/login' ? 
                user ? <Route path='/' component={Welcome} className={classes.linkButton} /> : <Link to='/login' className={classes.linkButton}><Button>Login</Button></Link>
                : '' 
              }
              {/* {isAdmin ? <Button><Link to='/pendingOrders'>Pending Orders</Link></Button> : ''} */}
              {/* <Button><Link to={'/checkout'}>Check Out</Link></Button> */}
  </Toolbar>
</AppBar>
</HashRouter> 
    </div>
    )
  }
}

const mapStateToProps = ({shoes, user, categories, lineItems, orders},props) =>{
  return{
    shoes,
    categories,
    user,
    lineItems,
    orders,
    props
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