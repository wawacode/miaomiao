$(document).ready(function () {

    $.fn.scrollTo = function( target, options, callback ){
        if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
        var settings = $.extend({
            scrollTarget  : target,
            offsetTop     : 50,
            duration      : 500,
            easing        : 'swing'
        }, options);
        return this.each(function(){
            var scrollPane = $(this);
            var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
            scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
                if (typeof callback == 'function') { callback.call(this); }
            });
        });
    }

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
                    shoppingCart.updateShopCartCountByItem(itemItem);
                });

                $('.rightContent').scrollTo(0,{'duration':0});

                $('.loadingMore').html('点击加载更多');
                $('.loadingMore').show();
            } else {
                $(item).addClass('hidden');
            }
        });
    }

    // events
    $(".shop-categray").click(function () {
        var me = this;
        $('.shop-categray').each(function (idx, item) {
            toggleSelectOnCategray(item, me == item ? true : false);
        })
        toggleProductOnCategrayClick(me);
    });

    $("#submit_shop").click(function () {

        $('#form_items').val(shoppingCart.getItemString());

    });

    $(".searchBar-input").bind( "focus", function(event, ui) {
        $('.search-overlay').removeClass('hidden');
        $(this).textinput({ clearSearchButtonText: "取消"});
    });

    $(".searchBar-input").bind( "blur", function(event, ui) {
        $('.search-overlay').addClass('hidden');
    });


    $(".loadingMore").click(function(){

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

                        $(data.data).each(function (idx, item) {

                            var tmpl = shoppingCart.createNewProductNode(item);

                            shoppingCart.addCountChangeListener(tmpl);
                            shoppingCart.addPreviewListener(tmpl);

                            $(visiableCate).append(tmpl);
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

   // actions

    $(function() {
        FastClick.attach(document.body);
    });

    shoppingCart.addAllCountChangeListener();
    shoppingCart.addAllPreviewListener();

    shoppingCart.loadShoppingCart();

    // default behavior
    var defaultCategray = $('.shop-categray')[0];
    toggleSelectOnCategray(defaultCategray, true);
    toggleProductOnCategrayClick(defaultCategray);

    shoppingCart.updateTotal();
    $('#submit_shop').removeAttr('disabled');

});


