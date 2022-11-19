const Krm = require('./');
const krm = new Krm();

krm.add('/안녕', (msg, reply) => {
    reply.randomText('안녕하세요!', msg.sender + '님 안녕하세요!');
});

krm.use((msg, reply, next) => {
    msg.encodedText = encodeURIComponent(msg.text);
    next();
});

krm.add('/구글 [:q]', (msg, reply) => {
    reply.text('https://google.com/search?q=' + msg.encodedText);
});

const { response } = krm;

// Debug
module.exports = response;