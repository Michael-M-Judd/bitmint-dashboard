import React, { Component } from 'react';

class Trade extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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