const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create CoinMetaSchema
const CoinMetaSchema = new Schema({
    coin: {
        type: String,
        required: true
    },
    twitterHandle: {
        type: String,
        required: false
    },
    reddit: {
        type: String,
        required: false
    },
    gitub: {
        type: String,
        required: false
    },
    googleTrends: {
        type: Object,
        required: false
    },
    medium: {
        type: String,
        required: false
    },
    otherNews: {
        type: Object,
        required: false
    }
})

module.exports = CoinMeta = mongoose.model('coinMeta', CoinMetaSchema);