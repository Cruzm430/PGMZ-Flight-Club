import React from 'react';
import { connect } from 'react-redux';
import Login from './Log_In'

const Home = ({shoes, auth, logout}) =>{
  console.log(shoes)
  return(
    <div>
        <Login/>
      <h1>
        Check Our Inventory!
      </h1>
      
      {
        shoes.map(shoe=><div key={shoe.id}>
          <div><img src={shoe.imageURL}/></div>
        {shoe.name} ({shoe.size}) -- ${shoe.price}</div>)
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
