import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import mealRoutes from './routes/mealRoutes';
import menuRoutes from './routes/menuRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Book-a-meal App (version 1).'
}));

// Setup a default catch-all route that sends back a welcome message.
app.get('*', (req, res) => res.status(200).send({
  message: 'Please, check your route details',
}));

module.exports = app;
