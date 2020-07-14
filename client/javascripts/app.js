"use strict";

//получить список заявок
$.post("/getOrders", {}, ordersList => refreshOrders(ordersList));

//добавить новую заявку
$(".addNewOrder").on("click", function () {
    let newOrder = prompt("Новая заявка");
    if ((newOrder === "") || (newOrder === null)) return;
    //отправить новую заявку по маршруту
    $.post("/addNewOrder", { newOrder }, function (ordersList) {
        //TODO: 200630-1043 Добавить обработчик ошибок при добавлении новой заявки
        refreshOrders(ordersList);
        socket.send(newOrder);
    });
});

//обновить список заявок
function refreshOrders(ordersList) {
    let $ordersList = $(".ordersList");
    $ordersList.empty();
    ordersList.forEach(order => $ordersList.append($("<li>").text(order.description)));
};

// проверяем поддержку WebSocket
if (!window.WebSocket) {console.log('WebSocket в этом браузере не поддерживается.');};

// создаем подключение
let socket = new WebSocket("ws://192.168.64.129:8081");

// слушаем входящие сообщения и обрабатываем их
socket.onmessage = function (event) {
    //let incomingMessage = event.data;
    $.post("/getOrders", {}, ordersList => refreshOrders(ordersList));
};