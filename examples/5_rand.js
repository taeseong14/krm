let Krm = require('krm');
let krm = new Krm();

let fish_list = ["굴비", "조기", "고등어", "갈치", "꽁치", "전어", "명태", "노가리", "황태", "은어", "민물어종 가물치", "쏘가리", "메기", "붕어", "잉어"];

let json = krm.File.readJson('fish') || {};

krm.add('!낚시', (msg, reply) => {
    if (!json[msg.sender]) json[msg.sender] = [];
    let fish = krm.Rand.fromArray(fish_list);
    reply.text('물고기를 잡는중...').delay(1000).text(fish + '를 잡았습니다!');
    json[msg.sender].push(fish);
    krm.File.writeJson('fish', json);
});

krm.add('!물고기', (msg, reply) => {
    if (!json[msg.sender]) json[msg.sender] = [];
    if (!json[msg.sender].length) reply.text('물고기가 없습니다.');
    else reply.text(json[msg.sender].join(', '));
});


let { response } = krm;
