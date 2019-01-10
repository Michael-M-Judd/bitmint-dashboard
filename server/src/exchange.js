const ccxt = require('ccxt');
const keys = require('../config/keys.js');

const exchange = new ccxt.binance({
    apiKey: keys.binanceApiKey,
    secret: keys.binanceApiSecret
});

module.exports = {
    exchange
}

