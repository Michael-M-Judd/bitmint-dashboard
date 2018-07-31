import { GET_OPEN_TRADES, GET_PROFIT_LOSS, SET_MARKET_VIEW, FORCE_SELL_TRADE } from './types';

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

/**
 * Force a sell on a specific ticker, either at market price or a specific quantity
 * @param {String} market in form 'TICK/BTC'
 * @param {Number} amount as the amount to sell. Currently default as whole amount
 * @param {Number} price to sell at. if none sent it will sell at market price
 */
export const forceSell = (market, amount, price) => {
    return function(dispatch) {
        fetch(`/api/price/sell`, {
            method: 'POST',
            body: JSON.stringify({ market, amount, price }),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data =>
            dispatch({
                type: FORCE_SELL_TRADE,
                payload: data
            }))
    }
}