let mongoose = require("mongoose"),
    OrderSchema = mongoose.Schema({
        index: Number,              // Номер заявки
        date: Date,                 // Дата заявки
        description: String,        // Описание заявки
        comment: String,            // Комментарий к заявке
        customer: String,           // Заказчик
        worker: String,             // Сотрудник исполняющий заявку
        status: String,             // Статус заявки
        solution: String            // Решение по заявке
    }),
    Order = mongoose.model("Order", OrderSchema);

module.exports = Order;