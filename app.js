const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const db = require('./db/index');
const { User, Shoe, Category } = db.models;
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = app;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/shoes', (req, res, next) => {
  Shoe.findAll()
    .then(shoes => res.send(shoes))
    .catch(next);
})

app.get('/shoes/:id', (req, res, next) => {
  Shoe.findAll({
    where: {
      categoryId: req.params.id
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

app.get('/categories',(req,res,next)=>{
  Category.findAll()
  .then(categories=>res.send(categories))
  .catch(next)
})
