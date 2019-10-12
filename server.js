const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const db = require('./db/index');
const { User, Shoe, Category } = db.models;

const port = process.env.PORT || 3000;

db.syncAndSeed()
  .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)));

app.use('/dist', express.static(path.join(__dirname, 'dist')));