"use strict";

let express = require("express"),
    app = express(),
    mongoose = require("mongoose");

//подключаемся к хранилищу данных ServiceDesk
mongoose.connect('mongodb://localhost/sd', { useNewUrlParser: true, useUnifiedTopology: true });
//Определяем схему и модель списка заявок
let OrderSchema = mongoose.Schema({ description: String }),
    Order = mongoose.model("Order", OrderSchema);

//запускаем сервер web сервер
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

//определяем пути запросов
app.post("/getOrders", (req, res) => getOrders(res));
app.post("/addOrder", function (req, res) {
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

function getOrders(res){
    Order.find({}, function (err, orders) {
        //TODO: 200619-1457 добавить функцию отработки ошибок
        res.json(orders);
    });
};

//для мониторинга перезагрузки сервера
console.log(new Date().getHours() + ":" + new Date().getMinutes());