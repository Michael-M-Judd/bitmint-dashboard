import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfitLoss } from '../actions/tradeActions';
const ccxt = require('ccxt');


class Trade extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.ticker !== undefined && this.props.buyPrice !== undefined) {
            this.props.getProfitLoss(this.props.ticker, this.props.buyPrice);
        }
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.ticker}</th>
                <th>{this.props.date}</th>
                <th>{this.props.tweet}</th>
                <th>{this.props.profitLosses[this.props.ticker]}</th>
            </tr>
        );
    }
}

const mapStateToProps = (state) => ({
    profitLosses: state.trade.profitLosses
})

export default connect(mapStateToProps, { getProfitLoss })( Trade );