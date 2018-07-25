import React, { Component } from 'react';
const ccxt = require('ccxt');

class Trade extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profitLoss: 0
        }
    }

    componentDidMount() {
        console.log('test')
        let ticker = this.props.ticker;
        let bittrex = new ccxt.bittrex();
        bittrex.proxy = 'https://crossorigin.me/';

        bittrex.fetchMarkets(ticker)
            .then(data => alert(data.last));
        /*
        ticker = ticker.replace('/', '-'); // replace / with - for api reasons.
        fetch(`/api/price/${ticker}`)
            .then(res => res.json())
            .then(data => console.log(data)) 
        */
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.ticker}</th>
                <th>{this.props.date}</th>
                <th>{this.props.tweet}</th>
                <th>{this.props.profitLoss}</th>
            </tr>
        );
    }
}

export default Trade;