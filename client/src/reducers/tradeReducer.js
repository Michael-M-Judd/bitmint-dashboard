import { GET_OPEN_TRADES, GET_PAST_SELLS, GET_PROFIT_LOSS } from '../actions/types';

const initialState = {
    openTrades: [],
    profitLosses: {}
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
            let profitLoss = currentPrice / action.buyPrice;
            return {
                ...state,
                profitLosses: {...state.profitLoss, ticker: profitLoss}
            }
            
        default:
            return state;
    }
}