$(document).ready(function () {

    function showShoppingCart(){

        $(".shoppingCartDisplay").slideToggle(function () {

            var isVisible = $(".shoppingCartDisplay").is(":visible");
            if (isVisible) {

                $('<div class="shoppingCartDisplayOverlay"> </div>').appendTo(document.body);

                $('.shoppingCartDisplayOverlay').click(function(){
                    showShoppingCart();
                });

            } else {
                $('.shoppingCartDisplayOverlay').remove();
            }
        });
    }

    $('.js-shopping-cart').click(function () {
        var me = this;
        var shopCartList = $('.js-shop-cart-list');
        shopCartList.empty();

        addNoResultsDisplay($('.shoppingCartList'));

        shoppingCart.createShopCartList(shopCartList);

        $('.js-product-item', shopCartList).each(function (i, tmpl) {

            hideNoResultsDisplay($('.shoppingCartList'));

            $('.countChangeActionMinus', tmpl).click(function (e) {
                e.stopPropagation();
                var qauntity = $('.js-product-item-quantity', tmpl).text();
                if (qauntity == 0) {
                    $(tmpl).remove();
                }

                if (!$('.js-product-item', shopCartList) || $('.js-product-item', shopCartList).length == 0) {
                    addNoResultsDisplay($('.shoppingCartList'));
                }
            });
        });

        showShoppingCart();

    });

    $('.clearShoppingCart').click(function(){


        var shopCartList = $('.js-shop-cart-list');
        $('.js-product-item', shopCartList).remove();
        addNoResultsDisplay($('.shoppingCartList'));

        shoppingCart.empty();


    });
});
