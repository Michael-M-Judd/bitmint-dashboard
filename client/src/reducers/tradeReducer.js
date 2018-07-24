import { GET_OPEN_TRADES, GET_PAST_SELLS } from '../actions/types';

const initialState = {
    openTrades: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_OPEN_TRADES:
            return {
                ...state,
                openTrades: action.payload
            }
        default:
            return state;
    }
}