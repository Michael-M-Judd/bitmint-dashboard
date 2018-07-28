import { GET_OPEN_TRADES, MARKET_SELL, GET_PROFIT_LOSS, SET_MARKET_VIEW } from './types';

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
        fetch(`/api/price/${market}`)
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: GET_PROFIT_LOSS,
                    payload: data,
                    buyPrice: buyPrice
                }))
    }
}

/**
 * Sets the current view for the trading chart (happens on market click)
 * @param {String} market in form 'TICK/BTC'
 * @returns dipatched action type SET_MARKET_VIEW payload = market
 */
export const setMarketView = market => {
    return function(dispatch) {
        dispatch({
            type: SET_MARKET_VIEW,
            payload: market
        })
    }
}