import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfitLoss, setMarketView, forceSell } from '../actions/tradeActions';


class Trade extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.ticker !== undefined && this.props.buyPrice !== undefined) {
            this.props.getProfitLoss(this.props.ticker.replace('/', '-'), this.props.buyPrice);
        }
    }

    setChart = () => {
        this.props.setMarketView(this.props.ticker);
    }

    render() {
        return (
            <tr>
                <th scope="row"><a href="#" onClick={ () => this.setChart()}>{this.props.ticker}</a></th>
                <th>{new Date(this.props.date * 1000).toString().split('GMT')[0]}</th>
                <th>{this.props.tweet}</th>
                <th>{this.props.profitLosses[this.props.ticker]}</th>
                <th><a 
                    className="text-danger"
                    href="#"
                    onClick={ () => this.props.forceSell(this.props.ticker, this.props.amount, undefined, this.props.buyPrice) }>Sell</a></th>
            </tr>
        );
    }
}

const mapStateToProps = (state) => ({
    profitLosses: state.trade.profitLosses
})

export default connect(mapStateToProps, { getProfitLoss, setMarketView, forceSell })( Trade );