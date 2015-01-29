$(document).ready(function () {

    function toggleSelectOnCategray(categray, selected) {

        if (selected) {
            $(categray).addClass('shop-categray-selected');
            $('.shop-categray-item', categray).addClass('shop-categray-item-selected');
            $('.shop-categray-item-decorate', categray).removeClass('hidden');

        } else {
            $(categray).removeClass('shop-categray-selected');
            $('.shop-categray-item', categray).removeClass('shop-categray-item-selected');
            $('.shop-categray-item-decorate', categray).addClass('hidden');
        }
    }

    function toggleProductOnCategrayClick(categray) {

        var cateId = $(categray).data('categray-id');
        $('.shop-product-categray-list').each(function (idx, item) {

            if ($(item).data('categray-id') == cateId) {
                $(item).removeClass('hidden');

                // update photo url
                $('.js-product-item',item).each(function(itemIdx,itemItem){
                    var icon = $('.prod_icon',itemItem);
                    if(icon && icon.data('imageurl')){
                        icon.css({'background-image':"url(" + icon.data('imageurl') +")"});
                    }
                });

                $('.loadingMore').html('点击加载更多');
                $('.loadingMore').show();
            } else {
                $(item).addClass('hidden');
            }
        })
    }

    $(document).on("vclick", ".shop-categray", function () {
        var me = this;
        $('.shop-categray').each(function (idx, item) {
            toggleSelectOnCategray(item, me == item ? true : false);
        })
        toggleProductOnCategrayClick(me);
    });

    $(document).on("click", "#submit_shop", function () {

        $('#form_items').val(shoppingCart.getItemString());

    });

    $(document).on("vclick", ".loadingMore", function () {

        var me = this;
        var visiableCate = $('.shop-product-categray-list:not(.hidden)');
        if (visiableCate) {
            var shop_id = $('#shop_id').val();
            var cateId = visiableCate.data('categray-id');
            var from = $('.js-product-item', visiableCate).length;
            var offset = 20;

            $(me).html('<i class="fa  fa-2x fa-spinner fa-spin"></i>');
            $.getJSON(
                "shop/getitems?shop_id=" + parseInt(shop_id) +
                    "&category_id=" + parseInt(cateId) + "&from=" + parseInt(from) +
                    "&offset=" + offset,
                function (data) {
                    if (data.code == 0 && Array.isArray(data.data) && data.data.length > 0) {


                        var tmpNode = $('.js-product-item', visiableCate).last().clone(true);

                        $(data.data).each(function (idx, item) {
                            var tmpl = tmpNode.clone(true);
                            if (tmpl) {
                                tmpl = tmpl.attr('id', item.id);
                                $('.js-product-item-id', tmpl).val(item.id);
                                $('.js-product-item-id', tmpl).attr('data-value', item.id);
                                $('.prod_icon', tmpl).css({ 'background-image': 'url("' + item.pic_url + '")'});

                                $('.js-product-item-name', tmpl).text(item.name);
                                $('.js-product-item-name', tmpl).attr('data-value', item.name);

                                $('.js-product-item-price', tmpl).attr('data-value', item.price);
                                $('.js-product-item-price', tmpl).html(parseInt(item.price / 100) + '<span>.' + item.price % 100 + '</span>');

                                $('.js-product-item-quantity', tmpl).text(0);

                                $('.product_stepper_minus', tmpl).addClass('hidden');
                                $('.product_stepper_count', tmpl).addClass('hidden');

                                $(visiableCate).append(tmpl);
                            }
                        });

                        $(me).html('点击加载更多');

                    } else {
                        // code not 0
                        $(me).html('点击加载更多');
                        $(me).hide();
                    }
                }
            );
        }
    });


    $("#shopConfirm").submit(function (event) {

        var values = $(this).serialize();
        shoppingCart.saveShoppingCart();

        if (!shoppingCart.productsEnoughtToShip()) {
            return false; // can't submit
        }

        $('#submit_shop').attr('disabled', "disabled");

        return true;
    });

    var defaultCategray = $('.shop-categray')[0];
    toggleSelectOnCategray(defaultCategray, true);
    toggleProductOnCategrayClick(defaultCategray);


    shoppingCart.loadShoppingCart();
    shoppingCart.updateTotal();

    $('#submit_shop').removeAttr('disabled');

    $('.js-product-item' ).click(function(e){
        e.stopPropagation();
        shoppingCart.countChangeAddHanlder($('.countChangeActionAdd',this));
    });

    $('.countChangeActionAdd' ).click(function(e){
        e.stopPropagation();
        shoppingCart.countChangeAddHanlder(this);
    });

    $('.countChangeActionMinus' ).click(function(e){
        e.stopPropagation();
        shoppingCart.countChangeMinusHanlder(this);
    });

});


