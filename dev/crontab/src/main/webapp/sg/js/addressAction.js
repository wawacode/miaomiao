$(document).ready(function () {

    shoppingCart.loadShoppingCart();

    function updateDefaultAddress(){
        var selected = $('.addressListSelection .addressSelected').first();

        if(!selected)alert('没有选择任何地址');

        var address = $('.addressItem-address', selected).data('default-address'),
            phone = $('.addressItem-phone', selected).data('default-phone'),
            id = $('.addressItem-id', selected).val();

        $('#addressSpinner').removeClass('hidden');
        $.getJSON('address/default',{ 'address':  address,
                'phone':phone,
                'address_id': id},
            function(status){
                $('#addressSpinner').addClass('hidden');

                if(status.code == 0){

                    $('#form_shop_id').val(getParameterByName('shop_id'));
                    $('#form_items').val(shoppingCart.getItemString());

                    var oldaddr = $('#shopConfirm').attr('action');
                    $('#shopConfirm').attr('action',oldaddr.replace(/shop_id=*/,'shop_id='+getParameterByName('shop_id')));

                    $('.useThisAddress').attr('disabled','disabled');

                    var data = $('#shopConfirm').serialize();
                    $('#shopConfirm').submit();

                }else{
                    alert('更改默认地址失败，请再次尝试');
                }
            });
    }

    $(document).on("vclick", ".useThisAddress", function () {
        updateDefaultAddress();
    });

    $('.useThisAddress').removeAttr('disabled');
});