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
 * @property {function} textTo
 * @property {function} randomText
 * @property {function} kakaolink
 * @property {function} delay
 * @property {function} read
 */

/**
 * @callback Handler
 * @param {Message} msg
 * @param {Reply} reply
 * @param {function} next
 */


/**
 * @typedef Replier
 * @property {function} reply
 * @property {function} replyRoom
 * @property {function} markAsRead
 */
/**
 * @typedef ImageDB
 * @property {string} profileHash
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

    /**
     * @type {(room: string, msg: string, sender: string, igc: boolean, replier: Replier, imageDB: ImageDB, packageName: string) => void}
     */
    response: response
}