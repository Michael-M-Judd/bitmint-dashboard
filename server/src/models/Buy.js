const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BuySchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    dayPriceOpen: {
        type: Number,
        required: true
    },
    dayPriceClose: {
        type: Number,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    tweet: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    algoDecision: {
        type: Number,
        required: true
    }
})

module.exports = Buy = mongoose.model('buy', BuySchema);