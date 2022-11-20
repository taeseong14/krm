let Krm = require('krm');
let krm = new Krm();

let fish_list = ["굴비", "조기", "고등어", "갈치", "꽁치", "전어", "명태", "노가리", "황태", "은어", "민물어종 가물치", "쏘가리", "메기", "붕어", "잉어"];

krm.add('!낚시', (msg, reply) => {
    let json = krm.File.readJson('fish') || {};
    if (!json[msg.user]) json[msg.user] = [];
    reply.text('물고기를 잡는중...');
    reply.delay(1000);
    let fish = krm.Rand.fromArray(fish_list);
    reply.text(fish + '를 잡았습니다!');
    json[msg.user].push(fish);
    krm.File.writeJson('fish', json);
});

krm.add('!물고기', (msg, reply) => {
    let json = krm.File.readJson('fish') || {};
    if (!json[msg.user]) json[msg.user] = [];
    if (!json[msg.user].length) reply.text('물고기가 없습니다.');
    else reply.text(json[msg.user].join(', '));
});


let { response } = krm;
