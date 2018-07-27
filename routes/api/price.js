const express = require('express');
const router = express.Router();
const ccxt = require('ccxt');
const keys = require('../../config/keys');

const bittrex = new ccxt.bittrex({
    apiKey: keys.bittrexApiKey,
    secret: keys.bittrexSecret
});

// @route   GET api/price/{market}
// @desc    Get pricing data for ticker using ccxt lib. Currently just bittrex
// @access  Public... For now
router.get('/:market', (req, res) => {
    let market = req.params.market;
    if (market == undefined) {
        res.json({response: 'error'})
    }
    else {
        market = market.replace('-', '/').toUpperCase(); // TODO: use body instead of param
        
        // fetch from ccxt
        bittrex.fetchTicker(market)
            .then(data => res.send(data))
            .catch(err => res.status(404).json({
                success: false, 
                error: err
            }));
    }
})


// @route   POST api/price/sell
// @desc    Sell at specified amount/price using ccxt or use current ask
// @access  Public... For now
router.post('/sell', (req, res) => {
    let market = req.body.market;
    let price = req.body.price;
    let amount = req.body.amount;
    if (market == undefined) {
        res.json({
            response: 'error',
            message: 'No market defined'})
    }
    else if (amount == undefined) {
        res.json({
            response: 'error',
            message: 'No amount set'
        })
    }

    if (price == undefined) { // we sell at market price
        // fetch from ccxt
        bittrex.fetchTicker(market)
            .then(data => {
                bittrex.createLimitSellOrder(market, amount, data.ask)
                    .then(resp => res.json({
                        success: true,
                        message: resp
                    }))
                    .catch(err => res.json({ // TODO: why isn't this returning the actual error?
                        success: false,
                        error: err
                   }))
            })
            .catch(err => res.status(404).json({
                success: false, 
                error: err
            }));
    }
    else {    // has price     
        bittrex.createLimitSellOrder(market, amount, price)
            .then(resp => res.json({
                success: true,
                message: resp
            }))
            .catch(console.log(err))
    }
})


module.exports = router;