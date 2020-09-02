"use strict";

//получить список заявок
// $.post("/getOrders", {}, ordersList => refreshOrders(ordersList));
refreshOrders();

//добавить новую заявку
$(".addNewOrder").on("click", function () {
    let newOrder = prompt("Новая заявка");
    if ((newOrder === "") || (newOrder === null)) return;
    //отправить новую заявку по маршруту
    $.post("/addNewOrder", { newOrder }, function (ordersList) {
        //TODO: 200630-1043 Добавить обработчик ошибок при добавлении новой заявки
        refreshOrders();
        socket.send(newOrder);
    });
});

//обновить список заявок
function refreshOrders() {
    $('#table_id').DataTable({
        ajax: {
            url: '/getOrders',
            type: 'POST',
            dataSrc: ''
        },
        columns: [
            { data: 'index' },
            { data: 'date' },
            { data: 'description' },
            { data: 'customer' },
            { data: 'worker' },
            { data: 'status' }
        ]
    });

    //     $('#table_id').DataTable({
    //         data: ordersList,
    //         columns: [
    //             { data: 'index' },
    //             // { data: 'date' },
    //             { data: 'date',
    //                 render: function (data, type, row) {
    //                     // let dateSplit = data.split('-');
    //                     let dateSplit = data.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1');
    //                     dateSplit = dateSplit.replace(RegExp("/","g"), ".");
    //                     dateSplit = dateSplit.replace("T", " ");
    //                     return type === "display" || type === "filter" ? dateSplit : data;
    //                 }
    //             },
    //             { data: 'description' },
    //             { data: 'customer' },
    //             { data: 'worker' },
    //             { data: 'status' }
    //         ]
    //     });
};

// проверяем поддержку WebSocket
if (!window.WebSocket) {
    console.log('WebSocket в этом браузере не поддерживается.');
} else {
    // создаем подключение
    //TODO: получить текущий ip адрес сервера
    let socket = new WebSocket("ws://192.168.0.13:8081");

    // слушаем входящие сообщения и обрабатываем их
    socket.onmessage = function (event) {
        //let incomingMessage = event.data;
        //$.post("/getOrders", {}, ordersList => refreshOrders(ordersList));
        refreshOrders();
    };
};