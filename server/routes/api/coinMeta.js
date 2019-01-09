const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const authToken = require('../../../config/keys').cryptoPanicAuthToken;


// TODO: finish this
// @route   GET api/coinMeta/news/:ticker
// @desc    Gets latest news from the cryptopanic.com api
// @access  Public... For now
router.get('/news/:market', (req, res) => {
    let market = req.params.market;
    if (market == undefined) {
        res.json({response: 'error'})
    }
    else {
        market = market.split('-')[0];
        
        fetch(`https://cryptopanic.com/api/posts/?auth_token=${authToken}&currencies=${market}`)
            .then(res => res.json())
            .then(json => res.send(json))
            .catch(err => res.json({
                response: 'error',
                error: err
            }))
    }
})

module.exports = router;