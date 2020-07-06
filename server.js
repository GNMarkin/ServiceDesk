"use strict";

let express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    OrdersController = require("./client/controllers/orders_controller.js");

//подключаемся к хранилищу данных ServiceDesk
mongoose.connect('mongodb://localhost/sd', { useNewUrlParser: true, useUnifiedTopology: true });


//подключаем websocket
let Static = require('node-static'),
    WebSocketServer = new require('ws'),
    clients = {}; //подключенные клиенты

// WebSocket-сервер на порту 8081
let webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on('connection', function (ws) {
    let id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);
        for (let key in clients) {clients[key].send(message);}
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });
});


//запускаем сервер web сервер
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

//определяем маршруты
app.post("/getOrders", OrdersController.read);
app.post("/addNewOrder", OrdersController.create);

//для мониторинга перезагрузки сервера
console.log(new Date().getHours() + ":" + new Date().getMinutes());