const conn = require('./conn');

const {User, Shoe, Category} = require('./models')

Shoe.belongsTo(Category)

const syncAndSeed = async() =>{
  await conn.sync({force:true});

  const users = [
    {name:'Mark', email:'mark@gmail.com', password:'MARK'},
    {name:'Zach', email:'zach@gmail.com', password:'ZACH', admin:true},
    {name:'Grey', email:'grey@aol.com', password:'GREY'},
    {name:'Palak', email:'palak@yahoo.com', password:'PALAK'}
  ]

  const categories=[
    {name:'Jordan'},
    {name:'Nike'},
    {name:'Luxury'}
  ]

  const [Jordan, Nike, Luxury] = await Promise.all(categories.map(category=>Category.create(category)))

  const shoes =[
    {imageURL:'njaisd.com', name:'Concord 11', price:400, size:11, categoryId: Jordan.id},
    {imageURL:'njaisd.com', name:'Supreme', price:850, size:6, categoryId: Luxury.id},
    {imageURL:'njaisd.com', name:'Foamposite Pro',price:390, size:8, categoryId: Nike.id},
    {imageURL:'njaisd.com', name:'Air Force One Black',price:100, size:13, categoryId: Nike.id}
  ]

  
  const [Mark, Zach, Grey, Palak] = await Promise.all(users.map(user=>User.create(user)))
  const [Concord, Supreme, NMD, Black] = await Promise.all(shoes.map(shoe=>Shoe.create(shoe)))
  

  return [Mark, Zach, Grey, Palak], [Concord, Supreme, NMD, Black], [Jordan, Nike]
}

module.exports={
  syncAndSeed,
  models:{
    User,
    Shoe,
    Category
  }
}