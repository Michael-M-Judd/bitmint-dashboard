// Express routes for interacting with the bot specifically
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
var occurrences = (string, subString, allowOverlapping) => {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}


// @route   GET api/bot/status
// @desc    Get the bots status
// @access  Public... For now
router.get('/status', (req, res) => {
    exec('ps -lA | grep python', (err, stdout, stderr) => {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }
        else {
            let botStatus = occurrences(stdout, 'python');

            if ( botStatus > 1 ){
                botStatus = true
            }
            else {
                botStatus = false
            }
                
            res.json({
                success: true,
                status: botStatus,
                error: stderr
            })
        }
    })
});


// @route   GET api/bot/start
// @desc    Start the bot run command line
// @access  Public... For now
router.get('/start', (req, res) => {

    let errorMessage = ''
    let status = true;

    exec('nohup python3 /root/twitter_classifier/stream_tweets.py &', (err, stdout, stderr) => {
        if (err) { // TODO: try stderr here too
            errorMessage = 'Tweet stream failed to start: ' + err;
            status = false;
        }
    })
    exec('nohup python3 /root/twitter_classifier/sell_bot.py &', (err, stdout, stderr) => {
        if (err) { 
            errorMessage += '\n Sell bot failed to start: ' + err;
        }
    })

    if (status) {
        res.json({
            success: true
        })
    }
    else { // bot failed
        res.json({
            success: false,
            error: errorMessage
        })
    }
});

// @route   GET api/bot/stop
// @desc    Stops the bot using command line
// @access  Public... For now
router.get('/stop', (req, res) => {
    exec('killall -r python', (err, stdout, stderr) => {
        if (err) { // TODO: try stderr here too
            res.json({
                success: false,
                error: err
            })
        }
        else {
            let msg = `Terminated ${occurrences(stdout)} processes`
            res.json({
                success: true,
                message: msg
            })
        }
    })
});

module.exports = router;