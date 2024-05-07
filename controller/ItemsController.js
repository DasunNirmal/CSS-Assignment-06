$('#nav-items-section').on('click',() => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    // Hide/show relevant sections
    $('#home-section').hide();
    $('#orders-section').hide();
    $('#customers-section').hide();
    $('#items-section').show();


    // Define a function for styling buttons
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
    styleButton(orders);
    styleButton(customers);

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
    applyHoverEffect(orders);
    applyHoverEffect(customers);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(items).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

/**Add, Update, Delete, Clear All**/

var items = [];
var recordIndexItems;

function clearAll() {
    $('#txtItemID').val("");
    $('#txtItemName').val("");
    $('#txtPrice').val("");
    $('#txtQuantity').val("");
}

$('#btnClearAll-items').on('click',() => {
    clearAll();
});

function loadItemTable() {
    $('#items-table-tb').empty();

    items.map((item,index) => {
        var itemRecord = `<tr>
                        <th class="i-id">${item.iId}</th>
                        <td class="i-name">${item.name}</td>
                        <td class="i-price">${item.price}</td>
                        <td class="i-qty">${item.qty}</td>
                    </tr>`
        $('#items-table-tb').append(itemRecord);
    });
}

$('#items-table-tb').on('click','tr',function () {
    recordIndexItems = $(this).index();

    var id = $(this).find(".i-id").text();
    var name = $(this).find(".i-name").text();
    var price = $(this).find(".i-price").text();
    var qty = $(this).find(".i-qty").text();

    $('#txtItemID').val(id);
    $('#txtItemName').val(name);
    $('#txtPrice').val(price);
    $('#txtQuantity').val(qty);
});

$('#addItems').on('click',() => {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    let item = {
        iId:itemID,
        name:itemName,
        price:itemPrice,
        qty:itemQty
    }

    items.push(item);
    loadItemTable();
    clearAll()
});

$('#btnDelete-items').on('click',() => {
    items.splice(recordIndexItems,1);
    loadItemTable();
    clearAll()
});

$('#btnUpdate-items').on('click',() => {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    var iOb = items[recordIndexItems];
    iOb.iId = itemID;
    iOb.name = itemName;
    iOb.price = itemPrice;
    iOb.qty = itemQty;

    loadItemTable();
    clearAll()
});
