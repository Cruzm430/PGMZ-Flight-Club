const conn = require('./conn');
const jwt = require('jsonwebtoken')
const {Sequelize} = conn;
const {UUID, UUIDV4, STRING, DECIMAL, BOOLEAN, INTEGER} = Sequelize

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
  },
  admin:{
    type:BOOLEAN,
    defaultValue:false
  },
  password:{
    type:STRING,
    allowNull:false
  }
})


User.findByToken = function(token){
    const { id } = jwt.verify(token, process.env.SECRET)
    return this.findByPK(id)
}

const Shoe = conn.define('shoe',{
  id:{
    type:UUID,
    primaryKey:true,
    defaultValue:UUIDV4
  },
  imageURL:{
    type:STRING,
    allowNull:false
  },
  name:{
    type:STRING,
    allowNull:false
  },
  price:{
    type:DECIMAL,
    allowNull:false
  }
})


const Category = conn.define('category',{
  id:{
    type:UUID,
    primaryKey:true,
    defaultValue:UUIDV4
  },
  name:{
    type:STRING,
    allowNull:false
  }
})

const LineItem = conn.define('lineitem', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1
  },
  size: {
    type: DECIMAL,
    allowNull: false
  },
  name:{
      type:STRING,
      allowNull:false
  }
})

const Order = conn.define('order', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  placed: {
    type: BOOLEAN,
    defaultValue: false
  },
  name:{
    type:STRING,
    allowNull:false
}
})

Shoe.belongsTo(Category);
Category.hasMany(Shoe);

Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

LineItem.belongsTo(Shoe);

module.exports = {
  User,
  Shoe,
  Category,
  LineItem,
  Order
}