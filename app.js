const express = require('express');
const app = express();
app.use(express.json());
const auth = require('./middleware/auth') //USE THIS FOR ROUTES THAT REQUIRE AUTHENTICATION
const path = require('path');
const db = require('./db/index');
const jwt = require('jsonwebtoken')
const { User, Shoe, Category } = db.models;
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

app.get('/categories',(req,res,next)=>{
  Category.findAll()
  .then(categories=>res.send(categories))
  .catch(next)
})
