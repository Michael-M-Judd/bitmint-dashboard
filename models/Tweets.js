const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Twitter Schema
const TwitterSchema = new Schema({
    coin: {
        type: String,
        required: true
    },
    twitterHandle: {
        type: String,
        required: false
    },
    tweet: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    change5Min: {
        type: Number,
        required: false
    },
    change1Hour: {
        type: Number,
        required: false
    },
    change1Day: {
        type: Number,
        required: false
    }
})

module.exports = Tweet = mongoose.model('tweets', TwitterSchema);