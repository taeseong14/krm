let Krm = require('krm');
let krm = new Krm();

krm.add('/ping', (msg, reply) => { // 일반 대답
    reply.text('pong');
});

krm.add('/hi', (msg, reply) => { // 랜덤 대답
    reply.randomText('hello', 'hi', msg.sender + '님 안녕하세요');
});

krm.add('/샌즈', (msg, reply) => { // 여러번 대답
    reply.text('샌즈').delay(1000).text('아시는구나');
});

krm.add('/검색 [:q]', (msg, reply) => { // param 사용
    reply.text('https://google.com/search?q=' + encodeURIComponent(msg.params.q));
});

let { response } = krm;
