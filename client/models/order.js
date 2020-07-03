let mongoose = require("mongoose"),
    OrderSchema = mongoose.Schema({ description: String }),
    Order = mongoose.model("Order", OrderSchema);

module.exports = Order;