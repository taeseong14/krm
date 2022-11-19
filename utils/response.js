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

const { read, write, readJson, writeJson } = require('./files');

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

    if (msg === '/krm info')
        replier.reply('krm v1.0.5\nhttps://github.com/taeseong14/krm');

    let handlerMsg = {
        text: msg,
        room: room,
        sender: sender,
        igc: igc,
        packageName: packageName,
        imageDB: imageDB,
        profileHash: imageDB.profileHash,
        read: read,
        write: write,
        readJson: readJson,
        writeJson: writeJson
    }

    let handlerReply = {
        /** @param {string} text */
        text: (text) => replier.reply(text),
        /**
         * @param {string} room 
         * @param {string} text 
         */
        textTo: (room, text) => replier.replyRoom(room, text),
        /** @param  {...string} */
        randomText: function () {
            let text = arguments[Math.floor(Math.random() * arguments.length)];
            this.text(text);
        },
        /**
         * @param {number} templete_num 
         * @param {object} [templete_args] 
         * @param {string} [room]
         * @returns {boolean}
         */
        kakaolink: (templete_num, templete_args, room) => {
            handlerReply.text('카카오링크는 아직 개발중입니다!'); // 만드는중
        },
        /** @param {number} ms miliseconds */
        delay: (ms) => java.lang.Thread.sleep(ms),
        read: () => replier.markAsRead()
    }


    a: for (let i = 0; i < this.handlers.length; i++) {
        let h = this.handlers[i];

        for (let j = 0; j < h.length; j++) {
            let h2 = h[j];
            let { pattern, handler } = h2;
            let params = {};
            pattern = pattern.replace(/\[\:([^ ]+)\]/g, (a, b) => {
                return params[b] = '([^]+)';
            });

            if (pattern === '*' || msg.match(new RegExp(pattern))) {
                let next = false;
                if (pattern !== '*') {
                    let match = msg.match(new RegExp(pattern));
                    for (let k = 0; k < match.length - 1; k++) {
                        let key = Object.keys(params)[k];
                        params[key] = match[k + 1];
                    }
                }
                handlerMsg.params = params;

                handler(handlerMsg, handlerReply, () => {
                    next = true;
                });

                if (!next) break a;
            }
        }
    }
}

module.exports = response;