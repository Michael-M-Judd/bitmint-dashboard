const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// routes
const buys = require('./routes/api/buys');
const bot = require('./routes/api/bot');
const price = require('./routes/api/price');
const coinMeta = require('./routes/api/coinMeta');

// Bodyparse Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/buys', buys);
app.use('/api/bot', bot);
app.use('/api/price', price);
app.use('/api/coinMeta', coinMeta);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log`Server started on port: ${port}`);