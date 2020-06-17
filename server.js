let express = require("express"),
    app = express();

//подгружаем список заявок
let orders = require("./orders.json");

app.use(express.static(__dirname + "/client"));
app.listen(3000);

app.get("/orders.json", function (req, res) {
    res.json(orders);
});

console.log(new Date().getMinutes());