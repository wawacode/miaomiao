$(document).ready(function () {

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

    $('.order-item').each(function (idx, item) {

        var string = $('.order-snapshots-string', item).val();
        try {
            var orders = JSON.parse(string);
            if (orders && Array.isArray(orders)) {
                var totalCount = 0,totalPrice = 0.0;
                $(orders).each(function (o_indx, order) {

                    totalCount += parseInt(order.count);
                    totalPrice += parseFloat(order.price || 0) * parseInt(order.count);

                        $('.order-snapshots', item).append(

                        '<div style="display: inline-block;width: 90%">' +
                            '<div style="float: left">' +
                            order.name +
                            '   </div>' +
                            '   <div style="float: right">' +
                            '       <span>￥</span> ' + parseFloat(order.price ? order.price/100.0 : 0.0) + '<span style="padding: 0.2em">X</span>' + order.count +
                            '   </div>' +
                            ' </div>'
                     );
                });
                $('.order-snapshots', item).append(

                    '<div style="display: block;width: 90%;text-align: right;margin-top: 20px">' +
                        '  共计: ' + totalCount +
                        ' 件 <span style="color: red">￥ ' +  parseFloat(totalPrice/100.0)  +
                        '</span>' +
                        ' </div>');
            }
        } catch (e) {
            console.error(e);
        }

    });


});


