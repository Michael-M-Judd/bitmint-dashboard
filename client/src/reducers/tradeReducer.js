import { GET_OPEN_TRADES, GET_PAST_SELLS, GET_PROFIT_LOSS, SET_MARKET_VIEW, FORCE_SELL_TRADE } from '../actions/types';

const initialState = {
    openTrades: [],
    profitLosses: {},
    marketView: 'BTCUSD'
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_OPEN_TRADES:
            return {
                ...state,
                openTrades: action.payload
            }
        case GET_PROFIT_LOSS:
            // This has all sorts of data that we can use like timestamp, high, low, etc.
            let data = action.payload; 
            let currentPrice = data.last; // we take current price as last price.
            let ticker = data.symbol;
            let profitLoss = (currentPrice / action.buyPrice).toFixed(4);

            let objectToAdd = {}; // Can't seem to do syntax {ticker: profitLoss} because it thinks ticker is the key
            objectToAdd[ticker] = profitLoss;
            return {
                ...state,
                profitLosses: {...state.profitLosses, ...objectToAdd}
            }
        case SET_MARKET_VIEW:
            let market = action.payload;
            market = market.replace('/', '');
            return {
                ...state,
                marketView: market
            }
        case FORCE_SELL_TRADE:
            let successStatus = action.payload.success;
            
            if (successStatus) {
                //TODO: Logic for removing from firebase here 

                // Add notification
            }
            else {
                // Add notification that it wasn't successful
                let err = action.payload.error;
            }

        default:
            return state;
    }
}