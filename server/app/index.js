const cors = require('cors');
const express = require('express');
const app = express();
const routeHandler = require('./routes');
const morgan = require('morgan');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', routeHandler);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running', success: true});
});



module.exports = app;