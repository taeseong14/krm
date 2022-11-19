let Krm = require('./');
let app = new Krm();

app.add('/안녕', (msg, reply) => {
    reply.randomText('안녕하세요!', msg.sender + '님 안녕하세요!');
});

app.use((msg, reply, next) => {
    msg.encodedText = encodeURIComponent(msg.text);
    next();
});

app.add('/구글 [:q]', (msg, reply) => {
    reply.text('https://google.com/search?q=' + msg.encodedText);
});

let { response } = app;

// Debug
module.exports = response;