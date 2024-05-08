import {customers} from "../db/db.js";
import {items} from "../db/db.js";

$('#nav-orders-section').on('click', () => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    /*Hide/show relevant sections*/
    $('#home-section').hide();
    $('#items-section').hide();
    $('#customers-section').hide();
    $('#orders-section').show();


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
    styleButton(home);
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
    applyHoverEffect(home);
    applyHoverEffect(customers);
    applyHoverEffect(items);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(orders).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

/*Search Customers*/
function searchCustomers(query) {
    const searchTerm = query.toLowerCase(); /*Convert the search query to lowercase for case-insensitive search*/
    const searchResults = customers.filter(customer => {
        /*Check if the customer ID or phone number contains the search term*/
        return customer.id.toLowerCase().includes(searchTerm) || customer.phoneNumber.toLowerCase().includes(searchTerm);
    });

    SetSearchCustomerResults(searchResults);
}

function SetSearchCustomerResults(results) {

    /*set each result*/
    results.forEach(customer => {
        $('#txtCustomerId-orders').val(customer.id);
        $('#txtCustomerName-orders').val(customer.name);
        $('#txtPhoneNumber-orders').val(customer.phoneNumber);
    });
}

$('#search-customers-orders').on('click', function() {
    const searchQuery = $(this).val();
    searchCustomers(searchQuery);
});

/*Search Items*/
function searchItems(query) {
    const searchTerm = query.toLowerCase(); /*Convert the search query to lowercase for case-insensitive search*/
    const searchResults = items.filter(items => {
        /*Check if the customer ID or phone number contains the search term*/
        return items.id.toLowerCase().includes(searchTerm) || items.name.toLowerCase().includes(searchTerm);
    });

    SetSearchItemResults(searchResults);
}

function SetSearchItemResults(results) {

    /*set each result*/
    results.forEach(items => {
        $('#txtItemId-orders').val(items.id);
        $('#txtItemName-orders').val(items.name);
        $('#txtUnitPrice-orders').val(items.price);
        $('#txtQtyOnHand-orders').val(items.qty);
    });
}

$('#search-items-orders').on('click', function() {
    const searchQuery = $(this).val();
    searchItems(searchQuery);
});