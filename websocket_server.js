"use strict";
//подключаем websocket
let Static = require('node-static'),
    WebSocketServer = new require('ws'),
    clients = {}; //подключенные клиенты

// WebSocket-сервер на порту 8081
let webSocketServer = new WebSocketServer.Server({ port: 8081 });

// открываем соединение с клиентом
webSocketServer.on('connection', function (ws) {
    //заносим новые подключения в массив для рассылки
    let id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    //слушаем входящие сообщения и отправляем их другим.
    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);
        for (let key in clients) {clients[key].send(message);}
    });

    //закрываем сессию в случае разрыва/закрытия
    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });
});