"use strict";

$.post("/getOrders", {}, ordersList => showOrders(ordersList));

$(".addOrder").on("click", function () {
    let newOrder = prompt("Новая заявка");
    if ((newOrder === "") || (newOrder === null)) return;
    $.post("/addOrder", { newOrder }, ordersList => showOrders(ordersList));
});

function showOrders(ordersList) {
    let $ordersList = $(".ordersList");
    $ordersList.empty();
    ordersList.forEach(order => $ordersList.append($("<li>").text(order.description)));
};