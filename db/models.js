const conn = require('./conn');
const {Sequelize} = conn;
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize

const User = conn.define('user',{
  id:{
    type:UUID,
    primaryKey:true,
    defaultValue:UUIDV4
  },
  name:{
    type:STRING,
    allowNull: false,
  },
  email:{
    type:STRING,
    allowNull: false
  }
})

const Shoe = conn.define('shoe',{
  id:{
    type:UUID,
    primaryKey:true,
  }
})