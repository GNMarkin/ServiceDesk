let express = require("express"),
    app = express();

//подгружаем список заявок
let orders = require("./orders.json");

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

app.get("/getOrders", function (req, res) {
    res.json(orders);
});
app.post("/postOrder", function (req, res) {
    console.log(req.body.newOrder);
    orders.push(req.body.newOrder);
});

console.log(new Date().getMinutes());