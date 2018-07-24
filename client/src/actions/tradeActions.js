import { GET_OPEN_TRADES, GET_PAST_SELLS } from './types';

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