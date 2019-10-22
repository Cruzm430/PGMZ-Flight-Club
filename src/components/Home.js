import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({shoes, auth, logout})=>{
  return(
    <div>
      <h1>
        Check Our Inventory!
      </h1>
      {
        shoes.map(shoe=><div key={shoe.id}>
          <div><img src={shoe.imageURL}/></div>
        <Link to={`/product/${shoe.id}`}>{shoe.name}: ${shoe.price}</Link></div>)
      }
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
