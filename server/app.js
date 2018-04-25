import dummymealRoutes from './dummyRoutes/mealRoutes';
import dummymenuRoutes from './dummyRoutes/menuRoutes';
import dummyuserRoutes from './dummyRoutes/userRoutes';
import dummyorderRoutes from './dummyRoutes/orderRoutes';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/meals', dummymealRoutes);
app.use('/api/v1/menu', dummymenuRoutes);
app.use('/api/v1/users', dummyuserRoutes);
app.use('/api/v1/orders', dummyorderRoutes);

// Setup a default catch-all route that sends back a welcome message.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of greatness.',
}));

module.exports = app;
