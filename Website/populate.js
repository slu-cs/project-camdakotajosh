const mongoose = require('mongoose');
const connect = require('./db');
const IceCream = require('./DB/IceCream_Schema');
const Store = require('./DB/Store_Schema');

// Connect to the database
connect();

// Model a collection of courses
const icecreams = [

];

// Model a collection of sections
const stores = [

];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(icecreams.map(IceCream => IceCream.save())))
  .then(() => Promise.all(stores.map(Store => Store.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));