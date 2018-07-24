import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Trade from './Trade';
import { connect } from 'react-redux';
import { getOpenTrades } from '../actions/tradeActions';



// Table of current live trades open with the bot
class CurrentTrades extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getOpenTrades();
    }

    render() {
        //const { openTrades } = this.props.trade;
        console.log(this.props)
        const {openTrades } = this.props;
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
                        {openTrades.map((trade) => (
                            <Trade 
                                ticker={trade.ticker}
                                date={trade.date}
                                tweet={trade.tweet}
                                profitLoss={trade.isOpen}></Trade>
                        ))}
                    </tbody>
                   
                </Table>
               
                    
                
            </div>
        );
    }
}

CurrentTrades.propTypes = {
    getOpenTrades: PropTypes.func.isRequired,
    openTrades: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    openTrades: state.trade.openTrades
})


export default connect(mapStateToProps, { getOpenTrades })(CurrentTrades);