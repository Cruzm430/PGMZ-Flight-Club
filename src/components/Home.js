import React from 'react';
import { connect } from 'react-redux';
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
      <Grid container spacing={24} style={{padding:24}}>
        {
          shoes.map(shoe=><Grid item xs={12} sm={6} lg={4} xl={3} key={shoe.id} style={{background:'lightGray', padding:'1rem'}}>
            <img src={shoe.imageURL} height={'350px'} width={'350px'}/>
            <a><Typography >{shoe.name}: ${shoe.price}</Typography></a>
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


// const Home = ({shoes,auth,logout})=>{
//   return(
//     <div>
//       <Grid container style={{padding:'100px', margin:'0'}}>
//       {
//         shoes.map(shoe=>
//           <Grid item key={shoe.id} style={{padding:'100 px'}}>
//             <Card>
//               <CardMedia><img src={shoe.imageURL} height={'400 px'} width={'400 px'}/></CardMedia>
//               <CardContent style={{background:'lightGray'}}>
//                 <a href={`/shoes/${shoe.id}`} style={{textDecoration:'none', color:'white'}}><Typography>{shoe.name}: ${shoe.price}</Typography></a>
//               </CardContent>
//             </Card>
//           </Grid>)
//       }
//     </Grid>
//     </div>
//   )
// }
