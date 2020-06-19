"use strict";

getAllOrders();

$(".addOrder").on("click", function () {
    let newOrder = prompt("Новая заявка");
    if ((newOrder === "") || (newOrder === null)) return;
    $.post("postOrder", { newOrder });
    getAllOrders();
});

function getAllOrders() {
    $.getJSON("/getOrders", function (ordersList) {
        let $ordersList = $(".ordersList");
        $ordersList.empty();
        ordersList.forEach(order => $ordersList.append($("<li>").text(order.order)));
    });
};