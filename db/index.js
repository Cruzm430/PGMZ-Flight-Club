const conn = require('./conn');
const bcrypt = require('bcrypt')

const {User, Shoe, Category, LineItem, Order} = require('./models')

Shoe.belongsTo(Category)


const syncAndSeed = async() =>{
  await conn.sync({force:true});

  

  const users = [
    {name:'Mark', email:'mark@gmail.com', password:'MARK'},
    {name:'Zach', email:'zach@gmail.com', password:'ZACH', admin:true},
    {name:'Grey', email:'grey@aol.com', password:'GREY', admin:true},
    {name:'Palak', email:'palak@yahoo.com', password:'PALAK'}
  ]

  const madeUsers = await Promise.all(users.map(user=>User.create(user)))
  const [Mark, Zach, Grey, Palak] = madeUsers;

  const categories=[
    {name:'Jordan'},
    {name:'Nike'},
    {name:'Luxury'}
  ]

  const madeCategories = await Promise.all(categories.map(category=>Category.create(category)));
  const [Jordan, Nike, Luxury] = madeCategories;

  const shoes =[
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQUul0PJOFk3fcQvngDepYQ3i-zVmUhPc8WWNUBJj4nRh2B2QN9DHdhIJWENzToI91g8Addu9xOqKclH62Owj68ALkv9OSuApoEUjdavFv5hYuVUaMiJGuW&usqp=CAc', 
    name:'Concord 11', price:400, categoryId: Jordan.id},
    {imageURL:'https://www.sepsport.com/media/x490/Nike_Air_Max_Shoes/Air_Max_270/Supreme_x_Nike_Air_MAX_270_University_Red_White_Black_Running_Shoes_AH8050-610.jpg', 
    name:'Supreme', price:850, categoryId: Luxury.id},
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQp0oZ50XJga0GjfFzyO-Os209mkVI8wwE200SeuGGbXO45aZPh7_T33ixp1_HZvEQjgybLUsCGSiGwen9YoAlszW54WrbOMvnVUiF4Jv5dC_6Os4ev9npEOg8&usqp=CAc', 
    name:'Dr. Doom Foamposite', price:390, categoryId: Nike.id},
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSrPPJxypqFyRr5kBj_v415imD7e01S_YNEsvdPpYgjtzsjosJj0ST_CIAzJXplIgy64JTbcDve7_mfISmFJ_GBoj-LfkEfx1iG4U88Iaf1dygXKna8tF5X&usqp=CAc', 
    name:'Air Force One Black',price:100, categoryId: Nike.id}
  ]

  const madeShoes = await Promise.all(shoes.map(shoe=>Shoe.create(shoe)))
  const [Concord, Supreme, NMD, Black] = madeShoes;

  const orders = [
    {placed: true, userId: Grey.id},
    {placed: false, userId: Grey.id},
    {placed: false, userId: Mark.id},
    {placed: false, userId: Zach.id},
    {placed: false, userId: Palak.id}
]

  const madeOrders = await Promise.all(orders.map(order => Order.create(order)));
  const [GreyCart, GreyCartUnPlaced, MarkCart, ZachCart, PalakCart] = madeOrders;

  const lineItems = [
    {quantity: 4, size: 10, shoeId: Supreme.id, orderId: GreyCartUnPlaced.id, name: Supreme.name},
    {quantity: 2, size: 9.5, shoeId: NMD.id, orderId: GreyCartUnPlaced.id, name: NMD.name},
    {quantity: 2, size: 10, shoeId:Supreme.id, orderId: GreyCartUnPlaced.id, name: Supreme.name},
]
  const madeItems = await Promise.all(lineItems.map(lineItem => LineItem.create(lineItem)));

  //return [madeUsers, madeCategories, madeShoes, madeOrders, madeItems]
}

module.exports={
  syncAndSeed,
  models:{
    User,
    Shoe,
    Category,
    Order,
    LineItem
  }
}