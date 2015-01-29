$(document).ready(function () {

    $(window).bind('beforeunload', function () {
        shoppingCart.saveShoppingCart();
    });

    shoppingCart.loadShoppingCart();
    shoppingCart.updateTotal();

    $('.countChangeActionAdd' ).click(function(){
        shoppingCart.countChangeAddHanlder(this);
    });

    $('.countChangeActionMinus' ).click(function(){
        shoppingCart.countChangeMinusHanlder(this);
    });

    $('#searchForm').submit(function () {

        var q = $('.searchBar-input', this).val();
        var destURL = location.origin + location.pathname.replace(/qvm/, 'query') + location.search.replace(/&key=[^&]*/g, '&key=' + q);

        $('#searchSpinner').removeClass('hidden');

        $.getJSON(destURL, function (result) {

            $('#searchSpinner').addClass('hidden');

            // update search result
            if (!result || !result.data || !result.data.length)return;

            var tmpNode = $('.js-product-item').last().clone(true);

            $('.js-product-item').remove();

            $(result.data).each(function (idx, item) {

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

                    $('.js-search-result-list').append(tmpl);
                }
            });
        });

        return false;
    });
});
