/**
 * @typedef Message
 * @property {string} text
 * @property {object} params
 * @property {string} room
 * @property {string} sender
 * @property {boolean} igc
 * @property {string} packageName
 * @property {ImageDB} imageDB
 * @property {string} profileHash
 */
/**
 * @typedef Reply
 * @property {function} text
 * @property {function} randomText
 * @property {function} kakaolink
 * @property {function} delay
 */

/**
 * @callback Handler
 * @param {Message} msg
 * @param {Reply} reply
 * @param {function} next
 */


let response = require('./response');

module.exports = {
    /**
     * @type {(pattern: string, handler: Handler) => void}
     */
    add: require('./add'),

    /**
     * @type {(handler: Handler) => void}
     */
    use: require('./use'),

    response: response
}