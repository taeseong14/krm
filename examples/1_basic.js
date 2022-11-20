let Krm = require('krm');
let krm = new Krm();

krm.add('/ping', (msg, reply) => {
    reply.text('pong');
});

krm.add('/hi', (msg, reply) => {
    reply.randomText('hello', 'hi', msg.sender + '님 안녕하세요');
});

krm.add('/검색 [:q]', (msg, reply) => {
    reply.text('https://google.com/search?q=' + encodeURIComponent(msg.params.q));
});

let { response } = krm;
