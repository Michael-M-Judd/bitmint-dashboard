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


    (async () => {

        if (price == undefined) { // we sell at market price
    
            try {
    
                const tickerData = await bittrex.fetchTicker(market); // get current pricing
                try { // attempte limit sell order
                    const response = await bittrex.createLimitSellOrder(market, amount, tickerData.ask);
                    res.json({
                        success: true,
                        message: response
                    })
                }
                catch(err) {
                    res.json({
                        success: false,
                        error: err.message
                    })
                }
            }
            catch (err) {
                res.json({
                    success: false,
                    error: err.message
                })
            }
    
        }
        else { // we have a defined price to sell at
            try {
                const response = await bittrex.createLimitSellOrder(market, amount, price);
                res.json({
                    success: true,
                    message: response
                })
            }
            catch(err) {
                res.json({
                    success: false,
                    error: err
                })
            }
        }
    })();
})


module.exports = router;