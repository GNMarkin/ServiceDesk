"use strict";

$.getJSON("/orders.json", function(orderObject){
    let $orderlist = $(".workPanel ul");
    $orderlist.empty();
    orderObject.forEach( order => $orderlist.append($("<li>").text(order)));
});
