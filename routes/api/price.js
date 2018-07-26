const express = require('express');
const router = express.Router();
const ccxt = require('ccxt');


//bittrex.fetchTicker('ETH/BTC')
   // .pipe(console.log())
const bittrex = new ccxt.bittrex();

// @route   GET api/price/{market}
// @desc    Get pricing data for ticker using ccxt lib. Currently just bittrex
// @access  Public... For now
router.get('/:market', (req, res) => {
    let market = req.params.market;
    if (market == undefined) {
        res.send({response: 'error'})
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
    //res.send(req.params.market);
})

module.exports = router;