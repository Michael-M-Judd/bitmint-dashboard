import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Trade from './Trade';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { getOpenTrades } from '../actions/tradeActions';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'



// Table of current live trades open with the bot
const CurrentTrades = ({firebase, openTrades }) => {

    //componentWillMount() {
        //this.props.getOpenTrades();
    //}
    console.log(openTrades);
    const date = new Date(0) ;
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
            profitLoss={trade.isOpen}></Trade>
    ))
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Market</th>
                            <th>Buy Date</th>
                            <th>Tweet</th>
                            <th>Profit/Loss</th>
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
    getOpenTrades: PropTypes.func.isRequired,
    openTrades: PropTypes.array.isRequired
}

/*
const mapStateToProps = (state) => ({
    openTrades: state.trade.openTrades
})
*/

//export default connect(mapStateToProps, { getOpenTrades })(CurrentTrades);

export default compose(
    firebaseConnect([
      'open' // { path: '/todos' } // object notation
    ]),
    connect((state) => ({
      openTrades: state.firebase.data.open,
      // profile: state.firebase.profile // load profile
    }))
  )(CurrentTrades)