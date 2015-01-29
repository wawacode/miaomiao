$(document).ready(function () {

    function warningOfNeccessInput(input) {
        $(input).css({'border': 'solid 1px red'});
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $('.js-addAddress input').blur(function ()          //whenever you click off an input element
    {
        if (!$(this).val()) {                      //if it is blank.
            $(this).css({'border': 'solid 1px red'});
        } else {
            $(this).css({'border': 0});
        }
    });

    // make select listener

    function switchToDefaultAddress(addressItem) {
        // clear current default or selected
        $('.addressListSelection .addressSelected').removeClass('addressSelected');
        $('.addressListSelection .fa-check').removeClass('fa-check');

        $(addressItem).addClass('addressSelected');
        $('.js-address-checked', addressItem).addClass('fa-check');
    }

    $(document).on("vclick", ".addressListSelection .addressItem", function () {

        switchToDefaultAddress(this);

    });

    $(document).on("vclick", " .addressListSelection .useNewAddress", function () {
        $('.addNewAddressIntoList ').slideDown();
        $('.useNewAddress').hide();
    });
    $(document).on("vclick", ".addNewAddressIntoList .cancelNewAddress", function () {
        $('.addNewAddressIntoList').slideUp();
        $('.useNewAddress').show();
    });

    $(document).on("vclick", ".addNewAddressIntoList .confirmNewAddress", function () {
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
            switchToDefaultAddress(addressItem);
        }

        $('.useNewAddress').show();

    });

});
