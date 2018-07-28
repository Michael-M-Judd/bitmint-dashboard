import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradingViewWidget from 'react-tradingview-widget';
import CurrentTrades from '../components/CurrentTrades';

class Home extends Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.props.marketView.split('BTC')[0]}</h2>
                        <TradingViewWidget symbol={this.props.marketView} height="600" width="100%"/>
                    </div>
                    <div className="col-md-6">
                        <h2>Active Trades</h2>
                        <CurrentTrades/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    marketView: state.trade.marketView
})

export default connect(mapStateToProps)( Home );