import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Login from './Login'
import Welcome from './Welcome'

const Home = ({shoes, auth, logout})=>{
  return(
    <div>
      <Grid container spacing={2} style={{padding:12}}>
        {
          shoes.map(shoe=><Grid item xs={12} sm={6} lg={4} xl={3} key={shoe.id} style={{background:'lightGray', padding:'1rem'}}>
            <Card style={{background:'darkGray'}}>
              <CardMedia style={{height:0, paddingTop:'65%'}} image={shoe.imageURL}/>
              <CardContent>
            <Link to={`/product/${shoe.id}`} style={{textDecoration:'none'}}><Typography style={{color:'white', fontWeight:'bold'}} component='p'>{shoe.name}: ${shoe.price}</Typography></Link>
            </CardContent>
            </Card>
            </Grid>)
        }
      </Grid>
    </div>
  )
}



const mapStateToProps = ({shoes}) =>{
  return {
    shoes
  }
}

export default connect(mapStateToProps)(Home)


