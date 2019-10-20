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

module.exports = app;


app.use('/dist', express.static(path.join(__dirname, 'dist')));


app.post('/api/attemptLogin', (req, res, next) => {
    const token = req.body.token.toString()
    const decodedPaylod = jwt.verify(token, 'private_key_here');   
    try {
        return decodedPaylod;
    }
    catch (ex) {
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



app.post('/api/login', async (req,res,next) => {
//AUTHENTICATION
    let user = await User.findOne({where: { email: req.body.email }});
    if (!user) return res.status(400).send('Invalid email or password.');

    if (req.body.password !== user.password) return res.status(400).send('Invalid email or password.');
    const token = jwt.sign({id: this.id}, 'private_key_here')
    // SHOULD PULL FUNCTION FROM USER MODEL - CAN'T Currently connect though
    //const token = await user.generateAuthToken()
    res.status(200).header('x-auth-token', token).send({user, token});
})

app.delete('/api/sessions', (req, res, next) => {
    res.cookie('x-auth-token', null).sendStatus(204);
  });

app.get('/categories',(req,res,next)=>{
  Category.findAll()
  .then(categories=>res.send(categories))
  .catch(next)
})
