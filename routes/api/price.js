const express = require('express');
const router = express.Router();
const ccxt = require('ccxt');


//bittrex.fetchTicker('ETH/BTC')
   // .pipe(console.log())

// @route   GET api/price/{market}
// @desc    Get peixw od xwerIN Mekwr
// @access  Public... For now
router.get('/:market', (req, res) => {
    let market = req.params.market;
    if (market == undefined) {
        res.send({response: 'error'})
    }
    else {
        market = market.replace('-', '/'); // TODO: use body instead of param
       (async function() {
            const bittrex = new ccxt.bittrex();

            res.send(await bittrex.fetchTicker(market));
       })()
    }
    //res.send(req.params.market);
})

module.exports = router;