'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

require('./src/app.js').start(process.env.PORT);
