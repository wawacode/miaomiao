$(document).ready(function () {

    shoppingCart.loadShoppingCart();

    $(" .addressListSelection .useNewAddress").click(function () {
        $('.addNewAddressIntoList ').slideDown();
        $('.useNewAddress').hide();
    });
    $(".addNewAddressIntoList .cancelNewAddress").click(function () {
        $('.addNewAddressIntoList').slideUp();
        $('.useNewAddress').show();
    });

    $(".addNewAddressIntoList .confirmNewAddress").click(function () {
        // append to
        var addr = $('.addNewAddressIntoList .addOrderAddress').val();
        if (!addr) {
            warningOfNeccessInput($('.addNewAddressIntoList .addOrderAddress'));
            return;
        }
        var phone = $('.addNewAddressIntoList .addOrderPhone').val();
        if (!phone) {
            warningOfNeccessInput($('.addNewAddressIntoList .addOrderPhone'));
            return;
        }

        $('.addNewAddressIntoList').slideUp();

        var addressItem = $('.addressListSelection .addressItem').last().clone(true);

        if (addressItem) {
            $('.addressItem-address', addressItem).attr('data-default-address', addr);
            $('.addressItem-phone', addressItem).attr('data-default-phone', phone);

            $('.addressAddrValue', addressItem).text(addr);
            $('.addressPhoneValue', addressItem).text(phone);

            $('.addressItem-id', addressItem).val('');

            $('.addressListSelection').prepend(addressItem);

            switchToDefaultAddress(addressItem,addr,phone,'');

        }

        $('.useNewAddress').show();

    });

    function switchToDefaultAddress(addressItem,address,phone,id) {

        // clear current default or selected
        $('.addressListSelection .addressSelected').removeClass('addressSelected');

        $(addressItem).addClass('addressSelected');

        addSpinner();

        $.getJSON('address/default',
            { 'shop_id': getParameterByName('shop_id'),
                'address':  address,
                'phone':phone,
                'address_id': id},
            function(status){

                removeSpinner();

                if(status.code == 0){

                    var origURL = $('#addressListOrigURL').val();
                    if(origURL && origURL.length > 0 && origURL.indexOf('$')!= 0){
                        makePost(origURL,{'items':shoppingCart.getItemString(),
                            'address':address,
                            'phone':phone,
                            'address_id':id});
                    }else{
                        makePost('user/profile?shop_id='+ getParameterByName('shop_id'),{});
                    }

                }else{
                    alert('添加新地址失败，请再次尝试');
                }
            });

    }

    $(".addressListSelection .addressItem").click( function () {

        var addr = $('.addressItem-address', this).data('default-address');
        var phone =$('.addressItem-phone', this).data('default-phone');
        var id = $('.addressItem-id', this).val();

        switchToDefaultAddress(this,addr,phone,id);

    });

    $(function() {
        FastClick.attach(document.body);
    });
});