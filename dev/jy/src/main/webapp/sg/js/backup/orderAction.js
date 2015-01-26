$(document).ready(function () {

    $(".addressItem").click( function () {
        makePost('../address?shop_id='+getParameterByName('shop_id'),{
            'origUrl':'shopCar/confirm?shop_id=' + getParameterByName('shop_id')
        })
    });

    $(".no-item-hint").click( function () {
        makeGo(' ../shop?shop_id=' + getParameterByName('shop_id'));
    });

    $("#submit_order").click( function () {


        if ($('.firstTimeAddAddress') && $('.firstTimeAddAddress').length) {
            // first time add address, no address ID
            updateSubmitInfo(shoppingCart.getItemString(),
                '',
                $('#newOrderAddress').val(),
                $('#newOrderPhone').val(),
                $('#orderRemarks').val());
        } else {
            // already have it, just use default message
            updateSubmitInfo(shoppingCart.getItemString(),
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

        if(!shoppingCart.productsEnoughtToShip()){
            return false;
        }
        var values = $(this).serialize();
        $('#submit_order').attr('disabled', "true");
        $('#submit_order').text('正在提交订单...');

        // delete items
        shoppingCart.empty();

        // udpate UI
        $('.js-product-item').remove();

        return true;
    });

    $('.countChangeActionAdd').click(function (e) {
        e.stopPropagation();
        shoppingCart.countChangeAddHanlder(this);
    });

    $('.countChangeActionMinus').click(function (e) {
        e.stopPropagation();
        shoppingCart.countChangeMinusHanlder(this,{'deleteItemWhenMinusToZero':true});

        if($(".js-product-item").length == 0){
           $('.no-item-hint').removeClass('hidden');
            $('.remarks').addClass('hidden');
        }
    });

    $(window).bind('beforeunload', function () {
        shoppingCart.saveShoppingCart();
    });

    $(function() {
        FastClick.attach(document.body);
    });

    shoppingCart.loadShoppingCart();
    shoppingCart.updateTotal();
    $('#submit_order').removeAttr('disabled');


});


