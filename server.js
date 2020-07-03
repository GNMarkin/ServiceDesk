"use strict";

let express = require("express"),
    app = express(),
    mongoose = require("mongoose");

//подключаем схемы базы данных    
let Order = require("./client/models/order.js"); //определяем схему и модель списка заявок

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

//определяем пути запросов
app.post("/getOrders", (req, res) => getOrders(res));
app.post("/addNewOrder", function (req, res) {
    let newOrder = new Order({ "description": req.body.newOrder });
    newOrder.save(function (err, result) {
        if (err !== null) {
            //TODO: 200619-1458 добавить функцию отработки ошибок
            console.log(err);
        } else {
            getOrders(res);
        }
    });

});

function getOrders(res) {
    Order.find({}, function (err, orders) {
        //TODO: 200619-1457 добавить функцию отработки ошибок
        res.json(orders);
    });
};

//для мониторинга перезагрузки сервера
console.log(new Date().getHours() + ":" + new Date().getMinutes());