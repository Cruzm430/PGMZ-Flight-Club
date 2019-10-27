import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Home = ({shoes})=>{
  return(
    <div>
      <Grid container spacing={8} style={{padding:24, paddingTop:'100px'}}>
        {
          shoes.map(shoe=><Grid item xs={12} sm={6} lg={4} xl={3} key={shoe.id} style={{background:'lightGray', padding:'1rem'}}>
            <Card style={{background:'darkGray'}}>
              <CardMedia style={{height:0, paddingTop:'65%'}} image={shoe.imageURL}/>
              <CardContent>
              <Link to={`/product/${shoe.id}`} style={{textDecoration:'none', color:'white'}}><Typography style={{fontWeight:'bold'}} component='p'>{shoe.name}: ${shoe.price}</Typography></Link>
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