import {orders,items,customers} from "../db/db.js";
export { loadOrderTableHome };

$('#orders-section,#customers-section,#items-section').hide();

/*home button css when the index file is loaded this will add initially*/
$(document).ready(() => {
    $('.current-page-button').css({
        background: '#B05200',
        color: '#FFEEE2',
        padding: '18px 28px',
        border: '30px',
        text: 'none',
        font: '1000',
        cursor:'pointer'
    });
    $('.Orders,.Customers,.Items').css({
        cursor:'pointer'
    });
    loadOrderTableHome();
});

function totalOrdersHome() {
    var total = orders.length;
    $('#totalOrdersHome').text(total);
}

function totalCustomersHome() {
    var total = customers.length;
    $('#totalCustomersHome').text(total);
}

function totalItemsHome() {
    var total = items.length;
    $('#totalItemsHome').text(total);
}

function totalSales() {
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.totalPrice;
    });
    $('#sales').text("Rs : "+totalSales+"/=");
}

$('#nav-home-section').on('click',() => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    /*Hide/show relevant sections*/
    $('#home-section').show();
    $('#orders-section').hide();
    $('#customers-section').hide();
    $('#items-section').hide();

    /*Define a function for styling buttons*/
    function styleButton(button) {
        button.css({
            background: 'none',
            color: '#B05200',
            padding: '18px 28px',
            border: '30px',
            text: 'none',
            font: '700',
            cursor: 'pointer'
        });
    }

    /*Applying styles to buttons*/
    styleButton(orders);
    styleButton(customers);
    styleButton(items);

    /*Define a function for hover effect*/
    function applyHoverEffect(button) {
        button.hover(function () {
            $(this).css({
                background: '#B05200',
                color: '#FEE5D4'
            });
        }, function () {
            $(this).css({
                background: 'none',
                color: '#B05200',
                padding: '18px 28px',
                border: '30px',
                text: 'none',
                font: '700'
            });
        });
    }

    /*Applying hover effect to buttons*/
    applyHoverEffect(orders);
    applyHoverEffect(customers);
    applyHoverEffect(items);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the home page btn.This is because all the css is applied to one file (SPA)*/
    $(home).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
    loadOrderTableHome();
    totalOrdersHome();
    totalCustomersHome();
    totalItemsHome();
    totalSales();
});

function loadOrderTableHome() {
    $('#orders-summary').empty();

    $.ajax({
        url: 'http://localhost:8081/PTOBackend/orderController',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res); // Log the response to verify the data format

            if (Array.isArray(res)) { // Check if 'res' is an array
                res.forEach(function(order) {
                    var orderRecord = `<tr>
                        <td class="o-id">${order.orderID}</td>
                        <td class="o-itemID">${order.itemID}</td>
                        <td class="o-itemName">${order.itemName}</td>
                        <td class="o-qty">${order.orderQty}</td>
                        <td class="o-order-date">${order.orderDate}</td>
                        <td class="o-totalPrice">${order.totalPrice}</td>
                    </tr>`
                    $('#orders-summary').append(orderRecord);
                });
            } else {
                console.log('No customer data found or incorrect response format.');
            }
        },
        error: function(res) {
            console.error('Error loading customer data:', res);
        }
    });
}
