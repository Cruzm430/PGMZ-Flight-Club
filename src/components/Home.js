import React from 'react';
import { connect } from 'react-redux';
import Log_In from './Log_In'

const Home = ({shoes}) =>{
  console.log(shoes)
  return(
    <div>
        <Log_In/>
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
