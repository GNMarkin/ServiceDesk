"use strict";

getAllOrders();

$(".addOrder").on("click", function () {
    let newOrder = prompt("Новая заявка");
    if ((newOrder === "") || (newOrder === null)) return;
    $.post("postOrder", { newOrder });
    getAllOrders();
});

function getAllOrders() {
    $.getJSON("/getOrders", function (orderObject) {
        let $orderList = $(".orderList");
        $orderList.empty();
        orderObject.forEach(order => $orderList.append($("<li>").text(order)));
    });
};