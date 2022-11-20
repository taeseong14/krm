// krm.use for adding middleware
let Krm = require('krm');
let krm = new Krm();

let chat = {};

krm.use((msg, reply, next) => {
    if (!chat[msg.room]) chat[msg.room] = [];
    chat[msg.room].push(msg);
    next();
});

krm.add('!채팅', (msg, reply) => {
    reply.text(chat[msg.room].map(m => m.sender + ': ' + m.text).join('\n'));
});

let { response } = krm;