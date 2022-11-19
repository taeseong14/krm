/**
 * @typedef Replier
 * @property {function} reply
 */
/**
 * @typedef ImageDB
 * @property {string} profileHash
 */

/**
 * @param {string} room 
 * @param {string} msg 
 * @param {string} sender 
 * @param {boolean} igc 
 * @param {Replier} replier 
 * @param {ImageDB} imageDB 
 * @param {string} packageName 
 */
function response(room, msg, sender, igc, replier, imageDB, packageName) {

    let handlerMsg = {
        text: msg,
        room: room,
        sender: sender,
        igc: igc,
        packageName: packageName,
        imageDB: imageDB,
        profileHash: imageDB.profileHash
    }

    let handlerReply = {
        text: (text) => replier.reply(text),
        randomText: function () {
            let text = arguments[Math.floor(Math.random() * arguments.length)];
            this.text(text);
        },
        kakaolink: () => { }, // 만드는중
        delay: (ms) => java.lang.Thread.sleep(ms)
    }


    for (let i = 0; i < this.handlers.length; i++) {
        let h = this.handlers[i];
        let { pattern, handler } = h;

        let params = {};
        pattern = pattern.replace(/\[\:([^ ]+)\]/g, (a, b) => {
            return params[b] = '([^]+)';
        });

        if (pattern === '*' || msg.match(new RegExp(pattern))) {
            let next = false;
            if (pattern !== '*') {
                let match = msg.match(new RegExp(pattern));
                for (let i = 0; i < match.length - 1; i++) {
                    let key = Object.keys(params)[i];
                    params[key] = match[i + 1];
                }
            }

            handler({
                ...handlerMsg,
                params: params
            }, handlerReply, () => {
                next = true;
            });

            if (!next) break;
        }
    }
}

module.exports = response;