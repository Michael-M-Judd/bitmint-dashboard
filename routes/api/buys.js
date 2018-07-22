const express = require('express');
const router = express.Router();

// Buy Model
const Buy = require('../../models/Buy');

// @route   GET api/buys
// @desc    Get all buys
// @access  Public... For now
router.get('/', (req, res) => {
    Buy.find()
    .sort({date: -1})
        .then(buys => res.json(buys));
})

// @route   GET api/buys/open
// @desc    Get all open buys
// @access  Public... For now
router.get('/open', (req, res) => {
    Buy.find({ isOpen: true || 1})
    .sort({date: -1})
        .then(buys => res.json(buys));
})

// @route   POST api/buys
// @desc    Create a buy
// @access  Public... For now
router.post('/', (req, res) => {
    const newBuy = new Buy({
        amount: req.body.amount,
        ticker: req.body.ticker,
        buyPrice: req.body.buyPrice,
        dayPriceOpen: req.body.dayPriceOpen,
        dayPriceClose: req.body.dayPriceClose,
        tweet: req.body.tweet,
        isOpen: req.body.isOpen,
        algoDecision: req.body.algoDecision,
        date: req.body.date
    });

    newBuy.save().then(buy => res.json(buy));
})

// @route   DELETE api/buys/:id
// @desc    Delete a buy
// @access  Public... For now
router.delete('/:id', (req, res) => {
    Buy.findById(req.params.id)
        .then(buy => buy.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false, 
            error: err
        }));
})

module.exports = router;