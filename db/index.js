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
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQUul0PJOFk3fcQvngDepYQ3i-zVmUhPc8WWNUBJj4nRh2B2QN9DHdhIJWENzToI91g8Addu9xOqKclH62Owj68ALkv9OSuApoEUjdavFv5hYuVUaMiJGuW&usqp=CAc', 
    name:'Concord 11', price:400, categoryId: Jordan.id},
    {imageURL:'https://www.sepsport.com/media/x490/Nike_Air_Max_Shoes/Air_Max_270/Supreme_x_Nike_Air_MAX_270_University_Red_White_Black_Running_Shoes_AH8050-610.jpg', 
    name:'Supreme', price:850, categoryId: Luxury.id},
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQp0oZ50XJga0GjfFzyO-Os209mkVI8wwE200SeuGGbXO45aZPh7_T33ixp1_HZvEQjgybLUsCGSiGwen9YoAlszW54WrbOMvnVUiF4Jv5dC_6Os4ev9npEOg8&usqp=CAc', 
    name:'Dr. Doom Foamposite', price:390, categoryId: Nike.id},
    {imageURL:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSrPPJxypqFyRr5kBj_v415imD7e01S_YNEsvdPpYgjtzsjosJj0ST_CIAzJXplIgy64JTbcDve7_mfISmFJ_GBoj-LfkEfx1iG4U88Iaf1dygXKna8tF5X&usqp=CAc', 
    name:'Air Force One Black',price:100, categoryId: Nike.id}
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