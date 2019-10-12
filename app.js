const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const db = require('./db/index');
const { User, Shoe, Category } = db.models;

module.exports = app;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

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