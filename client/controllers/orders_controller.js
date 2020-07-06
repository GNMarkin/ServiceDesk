//определяем схему и модель списка заявок
let Order = require("../models/order.js");
let OrdersController = {};

OrdersController.read = function (req, res) {
    getOrders(res);
};

OrdersController.create = function (req, res) {
    let newOrder = new Order({ "description": req.body.newOrder });
    newOrder.save(function (err, result) {
        if (err !== null) {
            //TODO: 200619-1458 добавить функцию отработки ошибок
            console.log(err);
        } else {
            getOrders(res);
        }
    });

};

function getOrders(res) {
    Order.find({}, function (err, orders) {
        //TODO: 200619-1457 добавить функцию отработки ошибок
        res.json(orders);
    });
};

module.exports = OrdersController;