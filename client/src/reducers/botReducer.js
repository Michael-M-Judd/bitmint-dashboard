import { GET_BOT_STATUS, TURN_BOT_OFF, TURN_BOT_ON } from '../actions/types';



const initialState = {
    status: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BOT_STATUS:
            if (action.payload.success === true) {
                
                let botStatus = action.payload.status;
                return {
                    ...state,
                    status: botStatus
                }
            }
            else { // TODO: deal with success == false with message endpoint returns
                return state;
            }
        case TURN_BOT_OFF:
            if (action.payload.success === true) {
                return {
                    ...state,
                    status: false
                }
            }
            else {
                return state;
            }
        case TURN_BOT_ON:
            if (action.payload.success === true) {
                return {
                    ...state,
                    status: true
                }
            }
            else {
                return state;
            }
            
        default:
            return state;
    }
}