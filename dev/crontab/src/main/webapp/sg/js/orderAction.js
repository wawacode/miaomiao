$(document).ready(function () {


    $(document).on("vclick", ".addressItem", function () {
        document.location.href = '../address?shop_id=' + getParameterByName('shop_id');
    });

    $(document).on("click", "#submit_order", function () {

        var items = [];
        for (var idx = 0; idx < shoppingCart.shoppingItemsArray.length; idx++) {
            items.push({'item_id': shoppingCart.shoppingItemsArray[idx].id, "count": shoppingCart.shoppingItemsArray[idx].quantity,
                'price': shoppingCart.shoppingItemsArray[idx].price, 'name': shoppingCart.shoppingItemsArray[idx].name});
        }

        if ($('.firstTimeAddAddress') && $('.firstTimeAddAddress').length) {
            // first time add address, no address ID
            updateSubmitInfo(JSON.stringify(items),
                '',
                $('#newOrderAddress').val(),
                $('#newOrderPhone').val(),
                $('#orderRemarks').val());
        } else {
            // already have it, just use default message
            updateSubmitInfo(JSON.stringify(items),
                $('.addressDefault-id').val(),
                $('.addressDefault-address').data('default-address'),
                $('.addressDefault-phone').data('default-phone'),
                $('#orderRemarks').val());
        }

    });


    function updateSubmitInfo(items, addressId, address, phone, remark) {

        if (items) {
            $('#order_items').val(items);
        }
        if (addressId) {
            $('#order_address_id').val(addressId);
        }

        if (address) {
            $('#order_address').val(address);
        }

        if (phone) {
            $('#order_phone').val(phone);
        }

        if (remark) {
            $('#order_remarks').val($('#orderRemarks').val());
        }

    }


    $("#orderConfirm").submit(function (event) {

        // exist the element and have no value
        if ($('#newOrderAddress') && $('#newOrderAddress').length && !$('#newOrderAddress').val()) {
            warningOfNeccessInput($('#newOrderAddress'));
            return false;
        }

        // exist the element and have no value
        if ($('#newOrderPhone') && $('#newOrderPhone').length && !$('#newOrderPhone').val()) {
            warningOfNeccessInput($('#newOrderPhone'));
            return false;
        }

        var values = $(this).serialize();

        $('#submit_order').attr('disabled', "true");

        shoppingCart.empty();

        return true;
    });

    shoppingCart.loadShoppingCart();
    shoppingCart.updateTotal();
    $('#submit_order').removeAttr('disabled');

    $('.countChangeActionAdd').click(function (e) {
        e.stopPropagation();
        shoppingCart.countChangeAddHanlder(this);
    });

    $('.countChangeActionMinus').click(function (e) {
        e.stopPropagation();
        shoppingCart.countChangeMinusHanlder(this);
    });

    $(window).bind('beforeunload', function () {
        shoppingCart.saveShoppingCart();
    });

});


