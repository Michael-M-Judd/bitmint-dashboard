import React, { Component } from 'react';
import { Table } from 'reactstrap';
import uuid from 'uuid';
import Trade from './Trade';

class CurrentTrades extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openTrades: [
                {id: '1', ticker: 'test'}
            ]
         };
    }

    componentWillMount() {
        fetch('/api/buys/open')
           .then(res => res.json())
           .then(allOpentrades => this.setState({
               openTrades: allOpentrades
           }))
           .catch(err => console.log(err));
    }

    render() {
        const { openTrades } = this.state;
        console.log(openTrades)
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

export default CurrentTrades;