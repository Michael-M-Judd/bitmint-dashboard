import React, { Component } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import CurrentTrades from '../components/CurrentTrades';

class Home extends Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <TradingViewWidget symbol="BTCUSD" theme={Themes.DARK} height="600" width="100%"/>
                    </div>
                    <div className="col-md-6">
                        <CurrentTrades/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;