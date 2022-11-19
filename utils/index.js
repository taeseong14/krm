/**
 * @typedef Message
 * @property {string} text
 * @property {object} params
 * @property {string} room
 * @property {string} sender
 * @property {boolean} igc
 * @property {string} packageName
 * @property {ImageDB} imageDB
 * @property {number} profileHash
 * @property {function} read
 * @property {function} write
 * @property {function} readJson
 * @property {function} writeJson
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


module.exports = {
    add: require('./add'),

    use: require('./use'),

    response: require('./response')
}