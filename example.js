const Krm = require('./');
const krm = new Krm();

krm.add('/ping', (msg, reply) => {
    reply.text('pong!');
});

krm.add('/안녕', (msg, reply) => {
    reply.randomText('안녕하세요!', '안녕!');
});

krm.add('/구글 [:q]', (msg, reply) => {
    reply.text('https://www.google.com/search?q=' + encodeURIComponent(msg.params.q));
});

krm.add('/네이버 [:q]', (msg, reply) => {
    reply.text('https://search.naver.com/search.naver?query=' + encodeURIComponent(msg.text.match[1]));
});


const { response } = krm;


// 테스트용 리스폰스
response('room', '/안녕', 'sender', true, { reply: (text) => console.log(text) }, {}, 'packageName');