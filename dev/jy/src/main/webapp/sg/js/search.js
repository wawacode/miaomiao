$(document).ready(function () {


    $(".searchBar-input").bind( "focus", function(event, ui) {
        $('.search-overlay').removeClass('hidden');
//        $(this).textinput({ clearSearchButtonText: "取消"});
    });

    $(".searchBar-input").bind( "blur", function(event, ui) {
        $('.search-overlay').addClass('hidden');
    });

    function showNoResults(){

        $('.no-result-display').remove();
        $('<div class="no-result-display" style="text-align: center;color: #808080">没有结果</div>').appendTo($('.js-search-result-list'));
    }

    function hideNoResults(){
        $('.no-result-display').remove();
    }

    $('#searchForm').submit(function () {

        document.activeElement.blur(); //hide keyboard

        var q = $('.searchBar-input', this).val();
        var destURL = location.href.replace(/qvm/, 'query') + '&key=' + q;

        addSpinner();
        hideNoResults();

        $.getJSON(destURL, function (result) {

            removeSpinner();
            // update search result
            if (!result || !result.data || !result.data.length){
                showNoResults();
                $('.js-product-item').remove();
                return;
            }

            $('.js-product-item').remove();
            $(result.data).each(function (idx, item) {

                var li = shoppingCart.createNewProductNode(item);
                shoppingCart.addCountChangeListener(li);
                shoppingCart.addPreviewListener(li);

                $('.js-search-result-list').append(li);
            });
        });

        return false;
    });

    $("#submit_search").click(function () {
        $('#search_items').val(shoppingCart.getItemString());
    });

    $("#shopConfirm").submit(function (event) {

        var values = $(this).serialize();

        if (!shoppingCart.productsEnoughtToShip()) {
            return false; // can't submit
        }
        $('#submit_shop').attr('disabled', "disabled");
        return true;
    });

    $(function() {
        FastClick.attach(document.body);
    });

    shoppingCart.addAllCountChangeListener();
    shoppingCart.addAllPreviewListener();

    shoppingCart.loadShoppingCart();
    shoppingCart.updateTotal();
    shoppingCart.updateShopCartCount();


});
