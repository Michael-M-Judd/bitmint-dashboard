import { GET_OPEN_TRADES, GET_PAST_SELLS, GET_PROFIT_LOSS } from './types';

/**
 * Gets all open trades from the bot using the node server.. Might change to firebase
 */
export const getOpenTrades = () => {
    return function(dispatch) {
        fetch('/api/buys/open')
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: GET_OPEN_TRADES,
                    payload: data
                }));
    }
}

/**
 * Get Profit/Loss
 * @param {String} markets in form 'TICK-BTC'
 * @returns {JSON} market data
 */
export const getProfitLoss = (market, buyPrice) => {
    return function(dispatch) {
        fetch('/api/price')
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: GET_PROFIT_LOSS,
                    payload: data,
                    buyPrice: buyPrice
                }))
    }
}