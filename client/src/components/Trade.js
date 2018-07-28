import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfitLoss, setMarketView } from '../actions/tradeActions';


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

export default connect(mapStateToProps, { getProfitLoss, setMarketView })( Trade );