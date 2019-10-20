import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Welcome from './Welcome'

const Home = ({shoes, auth, logout}) =>{
  return(
    <div>
      <h1>
        Check Our Inventory!
      </h1>
      {
        shoes.map(shoe=><div key={shoe.id}>
          <div><img src={shoe.imageURL}/></div>
        <a href={`/product/${shoe.id}`}>{shoe.name}: ${shoe.price}</a></div>)
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
