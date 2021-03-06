import { GET_BOT_STATUS, TURN_BOT_OFF, TURN_BOT_ON } from './types';
import { apiUrl } from '../constants';
console.log('API URL: ',apiUrl);

/**
 * Sends request to turn the bot ON from command line
 */
export const turnBotOn = () => {
    return function(dispatch) {
        fetch(`${apiUrl}/bot/start`)
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: TURN_BOT_ON,
                    payload: data
                }));
    }
}

/**
 * Sends request to turn bot OFF from command line
 */
export const turnBotOff = () => {
    return function(dispatch) {
        fetch(`${apiUrl}/bot/stop`)
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: TURN_BOT_OFF,
                    payload: data
                }));
    }
}

/**
 * Get the current run time status of the bot
 */
export const getBotStatus = () => {
    return function(dispatch) {
        fetch(`${apiUrl}/bot/status`)
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: GET_BOT_STATUS,
                    payload: data
                }));
    }
}