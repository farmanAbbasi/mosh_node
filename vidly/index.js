const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const registers =require('./routes/registers');
const auth= require('./routes/auth');

const express = require('express');
const app = express();

//this connect returns a promise
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
//actually it is users
app.use('/api/registers',registers);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));