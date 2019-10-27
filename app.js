const express = require('express');
const app = express();
app.use(express.json());
const auth = require('./middleware/auth') //USE THIS FOR ROUTES THAT REQUIRE AUTHENTICATION
const path = require('path');
const db = require('./db/index');
const jwt = require('jsonwebtoken')
const { User, Shoe, Category, Order, LineItem } = db.models;
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const bodyParser = require('body-parser')

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.post('/api/attemptSessionLogin', async (req, res, next) => {
    const token = req.body.token
    const decodedPayload = await jwt.decode(token, process.env.SECRET,(payload) => {
        return payload
    }); 
    if(decodedPayload) {
        res.send(decodedPayload)
    }
    else {
        res.status(400).send('invalid token')
    }
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/shoes', (req, res, next) => {
  Shoe.findAll()
    .then(shoes => res.send(shoes))
    .catch(next);
})

app.get('/shoes/filter/:catId', (req, res, next) => {
  Shoe.findAll({
    where: {
      categoryId: req.params.catId
    }
  })
    .then(shoes => res.send(shoes))
    .catch(next);
})

//could very well be optional!
app.get('/shoes/search/:str', (req, res, next) => {
  Shoe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${req.params.str}%`
      }
    }
  })
    .then(shoes => {
      res.send(shoes);
    })
    .catch(next);
})

app.post('/shoes', (req,res,next)=>{
    Shoe.create(req.body)
    .then(shoe=> res.send(shoe))
    .then(()=>res.status(201)) 
    .catch(next)
})

app.delete('/api/shoes/:id', (req, res, next) => {
  Shoe.findByPk(req.params.id)
    .then(shoe => shoe.destroy())
    .then(res.sendStatus(204))
    .then(console.log('helloooooo'))
    .catch(next);
})

app.put('/api/shoes/:id', (req,res,next) => {
  Shoe.findByPk(req.params.id)
    .then(shoe => shoe.update(req.body))
    .then(shoe => res.send(shoe))
    .catch(next)
})

app.post('/api/login', async (req,res,next) => {
//AUTHENTICATION
    let user = await User.findOne({where: { email: req.body.email }});
    if (!user) return res.status(400).send('Invalid email or password.');

    if (req.body.password !== user.password) return res.status(400).send('Invalid email or password.');
    const token = jwt.sign({id: user.id, name: user.name, admin: user.admin}, process.env.SECRET)

    const returnUser = {
        name: user.name,
        id: user.id,
        admin: user.admin
    }
    res.status(200).header('authToken', token).send({returnUser, token});
})

app.get('/categories', (req,res,next)=>{
  Category.findAll()
  .then(categories=>res.send(categories))
  .catch(next)
})

app.get('/cart/:id', async (req,res,next)=>{
  const order = await Order.findOne({where:{
      userId: req.params.id, 
      placed: false}})
  if(order){
    const cart = await LineItem.findAll({where:{orderId: order.dataValues.id}})
    console.log('cart',cart)
    return res.status(200).send(cart)
  }
  else{
    res.status(400).send('no cart yet')
  } 
})

app.get('/newOrders/:id', async (req,res,next)=>{
    const order = await Order.findAll({where:{
        userId: req.params.id}})
    if(order){
      return res.status(200).send(order)
    }
    else{
      res.status(400).send('no orders yet')
    } 
  })

app.post('/api/cart/:id', async (req,res,next)=> {
  const order = await Order.findOne({where:{userId:req.params.id}})
  if(order){
    LineItem.create(req.body)
    .then(newLine => res.send(newLine))
    .then(()=> res.sendStatus(201))
    .catch(next)
  }
  else{
    Order.create(req.params)
    .then(LineItem.create(req.body))
    .then(newLine => res.send(newLine))
    .then(()=>res.sendStatus(201))
    .catch(next)
  }
})
app.post('/api/orders', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .then(() => res.status(201))
    .catch(next);
})

app.put('/api/orders/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next)
})

app.get('/api/lineitems', (req, res, next) => {
  LineItem.findAll()
    .then(lineitems => res.send(lineitems))
    .catch(next);
})

app.post('/api/lineitems', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineitem => res.send(lineitem))
    .then(() => res.status(201))
    .catch(next)
})

app.put('/api/lineitems/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(lineitem => lineitem.update(req.body))
    .then(lineitem => res.send(lineitem))
    .catch(next)
})

app.get('/api/orders', (req, res, next) => {
  Order.findAll({where:{userId:req.params.id}})
    .then(orders => res.send(orders))
    .catch(next);
})

// app.get('/api/orders/:id', (req, res, next) => {
//   Order.findAll({
//     where: {
//       userId: req.params.id
//     }
//   })
//     .then(orders => res.send(orders))
//     .catch(next)
// })

// app.get('/cart/:id', async (req,res,next)=>{
//   const order = await Order.findOne({where:{userId: req.params.id}})
//   if(order){
//     return res.status(200).send(order)
//   }
//   else{
//     res.status(400).send('no cart yet')
//   }
// })

// app.post('/api/cart/:id', async (req,res,next)=> {
//   const order = await Order.findOne({where:{userId:req.params.id}})
//   if(order){
//     LineItem.create(req.body)
//     .then(newLine => res.send(newLine))
//     .then(()=> res.sendStatus(201))
//     .catch(next)
//   }
//   else{
//     Order.create(req.params)
//     .then(LineItem.create(req.body))
//     .then(newLine => res.send(newLine))
//     .then(()=>res.sendStatus(201))
//     .catch(next)
//   }
// })
