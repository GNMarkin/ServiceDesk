"use strict";

let express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    OrdersController = require("./client/controllers/orders_controller.js");

//подключаемся к хранилищу данных ServiceDesk
mongoose.connect('mongodb://localhost/sd', { useNewUrlParser: true, useUnifiedTopology: true });


//подключаем websocket для работы с клиентами в режиме онлайн 
require("./websocket_server.js");


//запускаем сервер web сервер
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

//определяем маршруты
app.post("/getOrders", OrdersController.read);
app.post("/addNewOrder", OrdersController.create);

//для мониторинга перезагрузки сервера
console.log(new Date());