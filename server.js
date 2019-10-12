const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const db = require('./db/index');