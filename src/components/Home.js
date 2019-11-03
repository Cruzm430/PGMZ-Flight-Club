import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    padding:'24px',
    paddingTop:'25px'
  },
  card:{
    background:'darkGray'
  },
  grid:{
    background:'lightGray',
    padding:'1 rem'
  },
  pic:{
    height:0,
    paddingTop:'65%'
  },
  linkButton:{
    textDecoration:'none',
    color:'white'
  },
  fonts:{
    fontWeight:'bold'
  }
})

const Home = ({shoes, classes})=>{
  return(
    <div>
      <Grid container spacing={8} className={classes.container}>
        {
          shoes.map(shoe=><Grid item xs={12} sm={6} lg={4} xl={3} key={shoe.id} className={classes.grid}>
            <Card className={classes.card}>
              <CardMedia className={classes.pic} image={shoe.imageURL}/>
              <CardContent>
              <Link to={`/product/${shoe.id}`} className={classes.linkButton}><Typography className={classes.fonts} component='p'>{shoe.name}: ${shoe.price}</Typography></Link>
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

export default connect(mapStateToProps)(withStyles(styles)(Home))