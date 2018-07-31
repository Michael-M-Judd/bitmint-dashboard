import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Trade from './Trade';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { getOpenTrades, getProfitLoss } from '../actions/tradeActions';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'



// Table of current live trades open with the bot
const CurrentTrades = ({firebase, openTrades }) => {

    //componentWillMount() {
        //this.props.getOpenTrades();
    //}
    const openTradeList = !isLoaded(openTrades)
    ? 'Loading'
    : isEmpty(openTrades)
      ? 'No active trades.'
      : Object.keys(openTrades).map((trade) => (
        <Trade
            key={trade}
            ticker={openTrades[trade].ticker}
            date={Date(openTrades[trade].buy_time).split('GMT')[0]}
            tweet={openTrades[trade].tweet}
            buyPrice={openTrades[trade].buy_price}
            amount={openTrades[trade].amount}>
        </Trade>
    ))
        return (
            <div>
                <Table id="current-trades" className="table-borderless table-striped app-card">
                    <thead>
                        <tr>
                            <th>Market</th>
                            <th>Buy Date</th>
                            <th>Tweet</th>
                            <th>Profit/Loss</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {openTradeList}
                    </tbody>
                   
                </Table>
               
                    
                
            </div>
        );
    
}

CurrentTrades.propTypes = {
    //getOpenTrades: PropTypes.func.isRequired,
    openTrades: PropTypes.array
}

/*
const mapStateToProps = (state) => ({
    openTrades: state.trade.openTrades
})
*/

//export default connect(mapStateToProps, { getOpenTrades })(CurrentTrades);

export default compose(
    firebaseConnect([
      'open' //  firebase path = '/open' 
    ]),
    connect((state) => ({
      openTrades: state.firebase.data.open,
      profitLosses: state.trade.profitLosses
    }))
  )(CurrentTrades)