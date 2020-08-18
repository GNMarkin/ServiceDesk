"use strict";
let Orders = require("../models/order.js");

let UploadData = function (req, res) {
    //===== Загрузка Заявок в базу данных =====
    console.log("Загрузка Заявок в базу данных");
    Orders.deleteMany({}, function (err, result) {
        if (err !== null) { console.log(err) };

        let ordersSD = require("../../dataFrom1c.json");
        ordersSD.forEach(function (orderSD) {
            let newOrder = new Orders;

            newOrder.index = Number(orderSD.index);
            newOrder.date = new Date(orderSD.date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            newOrder.description = orderSD.description;
            newOrder.comment = orderSD.comment;
            newOrder.customer = orderSD.customer;
            newOrder.worker = orderSD.worker;
            newOrder.status = orderSD.status;

            newOrder.save(function (err, result) {
                if (err !== null) { console.log(err); };
            });
        });
        console.log("Заявки обработаны");
        res.send("Данные заявок обработаны");
    });
};

module.exports = UploadData;