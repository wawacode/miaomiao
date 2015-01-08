(function (window, document) {


    var shoppingCart = {

    };

    shoppingCart.shoppingItemsCategraysDict = {};
    // special fields for items
    shoppingCart.reservedFields = ['quantity', 'id', 'category_id', 'price','pic_url', 'name', 'shipping', 'tax', 'taxRate'];


    function isEmpty(map) {
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }


    shoppingCart.getTotalPrice = function () {

        var total = 0.0;

        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {
                var itemdetail = items[item];
                total += parseFloat(itemdetail.price || 0.0) * parseInt(itemdetail.quantity || 0);
            }
        }
        return total/100.0;

    };

    shoppingCart.getTotalQuantity = function () {

        var total = 0;

        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {
                var itemdetail = items[item];
                total += parseInt(itemdetail.quantity || 0);
            }
        }
        return total;
    };

    shoppingCart.empty = function () {

        this.shoppingItemsCategraysDict = {};

        this.updateShopCartCount();
        this.updateTotal();

        this.saveShoppingCart();

    };

    shoppingCart.findCateIdForProductId = function (productID) {

        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {
                var itemdetail = items[item];
                if (item == productID || itemdetail.id == productID)return cates;
            }
        }
        return 0;
    };

    // storage
    shoppingCart.saveShoppingCart = function () {

        var items = {}, me = this;
        localStorage.setItem("categray_dict", JSON.stringify(me.shoppingItemsCategraysDict));
    };

    shoppingCart.loadShoppingCart = function () {

        // empty without the update
        var categraies = localStorage.getItem("categray_dict");

        if (!categraies) {
            return;
        }

        // we wrap this in a try statement so we can catch
        // any json parsing errors. no more stick and we
        // have a playing card pluckin the spokes now...
        // soundin like a harley.
        try {

            this.shoppingItemsCategraysDict = JSON.parse(categraies);

        } catch (e) {
            console.error("Error Loading data: " + e);
        }
    };


    shoppingCart.productsEnoughtToShip = function () {

        var definedMinFreeDelivery = 20;

        var totolp = parseFloat(shoppingCart.getTotalPrice());

        return totolp >= definedMinFreeDelivery;
    };

    shoppingCart.updateTotal = function () {

        var definedMinFreeDelivery = 20;
        var totolp = parseFloat(shoppingCart.getTotalPrice());

        if (totolp < definedMinFreeDelivery) {

            var number = Math.round((definedMinFreeDelivery - totolp) * 100) / 100;

            $(".js-checkout-hit").css({'font-weight': 100, 'font-size': '12px'});
            $(".js-checkout-hit").html('差 <label style="font-weight: bold;font-size: 18px;display: inline-block;width: 35px;margin: 0em;">' + number + '</label> 元起送');

            $(".js-confirm-hit").css({'font-weight': 100, 'font-size': '12px'});
            $(".js-confirm-hit").html('差 <label style="font-weight: bold;font-size: 18px;display: inline-block;width: 35px;margin: 0em;">' + number + '</label> 元起送');

            $(".js-cart-checkout").css({'background-color': '#7c7d80'});
        } else {
            $(".js-checkout-hit").css({'font-weight': 100, 'padding-left': '0.3em', 'padding-right': '0.3em', 'font-size': '18px'});
            $(".js-checkout-hit").text('去结算');

            $(".js-cart-checkout").css({'background-color': '#F54447'});

            $(".js-confirm-hit").css({'font-weight': 100, 'padding-left': '0.3em', 'padding-right': '0.3em', 'font-size': '18px'});
            $(".js-confirm-hit").text('货到付款');
        }
        $("#js-shop-total-price").text(totolp);
        $("#js-shop-total-count").text(shoppingCart.getTotalQuantity());

        // update categray shop list
        var me = this;
        $('.shop-categray').each(function (idx, item) {

            var cid = $(item).data('categray-id');
            if (cid && me.shoppingItemsCategraysDict && me.shoppingItemsCategraysDict[cid]) {
                var total = 0, cates = me.shoppingItemsCategraysDict[cid];
                for (var prop in cates) {

                    var itemdetail = cates[prop];
                    total += parseInt(itemdetail.quantity || 0);
                }
                if (total > 0) {
                    $('.shop-categray-item-edge', item).removeClass('hidden');
                    $('.shop-categray-item-edge', item).text(parseInt(total));
                } else {
                    $('.shop-categray-item-edge', item).addClass('hidden');
                }
            }else{
                $('.shop-categray-item-edge', item).text(0);
                $('.shop-categray-item-edge', item).addClass('hidden');
            }
        })
    };


    shoppingCart.updateCategrayDictOnProductCountChange = function (fields, action) {

        // update categray list
//            {
//                '12':{ // cateid
//                    '121212':{ // item id
//
//                        'name':'sssss',
//                        'price':'101',
//                        'quantity':'2',
//                        'pic_url':'http...'
//                    }
//                }
//            }

        this.shoppingItemsCategraysDict = this.shoppingItemsCategraysDict || {};

        var cateId = fields.category_id || 0; // make 0 the default
        var id = fields.id;

        this.shoppingItemsCategraysDict[cateId] = this.shoppingItemsCategraysDict[cateId] || {};

        if (action == 'add') {

            if (this.shoppingItemsCategraysDict[cateId][id]) {
                var obj = this.shoppingItemsCategraysDict[cateId][id];
                obj.quantity = parseInt(obj.quantity, 10) + 1;
            } else {
                this.shoppingItemsCategraysDict[cateId][id] = {'name': fields.name,
                    'price': fields.price,
                    'quantity': 1,
                    'category_id': cateId,
                    'id': id,
                    'pic_url': fields.pic_url};
            }

        } else if (action == 'minus') {
            if (this.shoppingItemsCategraysDict[cateId][id]) {

                var obj = this.shoppingItemsCategraysDict[cateId][id];
                obj.quantity = parseInt(obj.quantity, 10) - 1;
                if (obj.quantity == 0) {
                    delete this.shoppingItemsCategraysDict[cateId][id];
                    if (isEmpty(this.shoppingItemsCategraysDict[cateId])) {
                        delete this.shoppingItemsCategraysDict[cateId];
                    }
                }
            }
        }

    };

    shoppingCart.getItemString = function () {

        var results = [];
        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {
                var itemdetail = items[item];

                results.push({'item_id': item, "count": itemdetail.quantity,
                    'price': itemdetail.price, 'name': itemdetail.name,
                    'pic_url': itemdetail.pic_url});
            }
        }

        return JSON.stringify(results);
    };


    shoppingCart.createProductNode = function (tmpl, item) {

        tmpl = tmpl.attr('id', item.id);

        $('.js-product-item-id', tmpl).val(item.id);
        $('.js-product-item-id', tmpl).attr('data-value', item.id);

        $('.js-product-category-id', tmpl).val(item.category_id);
        $('.js-product-category-id', tmpl).attr('data-value', item.category_id);

        $('.prod_icon', tmpl).css({ 'background-image': 'url("' + item.pic_url + '")'});

        $('.js-product-item-name', tmpl).text(item.name);
        $('.js-product-item-name', tmpl).attr('data-value', item.name);

        $('.js-product-item-price', tmpl).attr('data-value', item.price);

        $('.js-product-item-price', tmpl).html('<span style="font-weight: normal">¥</span>'+parseInt(item.price / 100) + '<span>.' + item.price % 100 + '</span>');

        var count = this.getShopcartCountByItemID(item.id);

        if(count && count > 0){
            $('.js-product-item-quantity', tmpl).text(count);
        }else{
            $('.js-product-item-quantity', tmpl).text(0);
            $('.product_stepper_minus', tmpl).addClass('hidden');
            $('.product_stepper_count', tmpl).addClass('hidden');
        }

        return tmpl;

    };

    shoppingCart.createNewProductNode = function (item) {

        var li = $('<li class="product-item js-product-item" id="'+ item.id + '"></li>'); 
        li.append('<input type="hidden" class="js-product-item-id" value="'+ item.id+' " data-value="'+ item.id+'"/>');
        li.append('<input type="hidden" class="js-product-category-id" value="'+ item.category_id+'" data-value="'+ item.category_id+'"/>');

        li.append('<div class="prod_icon_clickable"></div>');
        li.append('<div class="prod_icon" style="background-image:url(' + item.pic_url+')"' +' data-imageurl="'+ item.pic_url +'"></div>');

        var prod = $('<div></div>');
        prod.append('<span class="product-title oneline js-product-item-name" data-value="'+ item.name+'">'+ item.name +'</span>');

        var prod_info = $('<div class="prod_info"></div>');
        prod_info.append('<div class="product-price js-product-item-price" data-value="'+ item.price+'">' +
            '<span style="font-weight: normal">¥</span>'+parseInt(item.price / 100) + '<span>.' + item.price % 100 + '</span>' +
            '</div>');

        prod_info.append('<div class="product_stepper"><div class="product_stepper_minus countChangeAction countChangeActionMinus">-</div><div class="product_stepper_count countChangeAction countChangeActionSet js-product-item-quantity">0</div>' +
            '<div class="product_stepper_add countChangeAction countChangeActionAdd">+</div></div>');

        prod.append(prod_info);
        li.append(prod);

        var count = this.getShopcartCountByItemID(item.id);

        if(count && count > 0){
            $('.js-product-item-quantity', li).text(count);
        }else{
            $('.js-product-item-quantity', li).text(0);
            $('.product_stepper_minus', li).addClass('hidden');
            $('.product_stepper_count', li).addClass('hidden');
        }

        var popup = $('<div class="product-popup" style="display: none" data-popup-id="'+ item.id + '"></div>');
        popup.append('<div class="prod-popup-icon"><img class="prod-popup-image" src="" data-imageurl=" '+ item.pic_url +'"></div>');
        li.append(popup);

        return li;
    };

    shoppingCart.createShopCartList = function(container){

        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {

                var itemdetail = items[item];

                var node = this.createNewProductNode(itemdetail);
                shoppingCart.addCountChangeListener(node);

                container.append(node);
            }
        }
    };

    // update search results by shopping cart
    shoppingCart.updateShopCartCount = function(){
        var me = this;
        $('.js-product-item').each(function(idx,tmpl){

            var id = $('.js-product-item-id', tmpl).val();
            var count = me.getShopcartCountByItemID(id);
            if(count && count > 0){
                $('.js-product-item-quantity', tmpl).text(count);
            }else{
                $('.js-product-item-quantity', tmpl).text(0);
                $('.product_stepper_minus', tmpl).addClass('hidden');
                $('.product_stepper_count', tmpl).addClass('hidden');
            }
        });
    };


    shoppingCart.updateShopCartCountByItem = function(tmpl){

        var id = $('.js-product-item-id', tmpl).val();
        var count = this.getShopcartCountByItemID(id);
        if(count && count > 0){
            $('.js-product-item-quantity', tmpl).text(count);
        }else{
            $('.js-product-item-quantity', tmpl).text(0);
            $('.product_stepper_minus', tmpl).addClass('hidden');
            $('.product_stepper_count', tmpl).addClass('hidden');
        }
    };


    shoppingCart.addDeleteItemWhenCountIsZeroListener = function(tmpl){

        $('.countChangeActionMinus',tmpl).click(function(e){
            e.stopPropagation();
            var qauntity = $('.js-product-item-quantity', tmpl).text();
            if (qauntity == 0) {
                $(tmpl).remove();
            }
        });
    };

    shoppingCart.addCountChangeListener = function(tmpl){

        $('.countChangeActionAdd',tmpl).click(function(e){
            e.stopPropagation();
            shoppingCart.countChangeAddHanlder(this);
        });

        $('.countChangeActionMinus',tmpl).click(function(e){
            e.stopPropagation();
            shoppingCart.countChangeMinusHanlder(this);
        });
    };

    shoppingCart.previewHandler = function(tmpl){

        var id = $('.js-product-item-id', tmpl).data('value');
        var destPopup = $('.product-popup[data-popup-id="'+ id +'"]');
        if(!destPopup)return;
        destPopup.bPopup({
            onOpen: function() {
            },
            onClose: function() {
            }
        },function(){
            // update img url
            var img = $('img',destPopup);
            if(!img)return;
            img.attr("src" , img.data('imageurl'));

            destPopup.off("click");
            destPopup.click(function(e){
                e.stopPropagation();
                $(this).bPopup().close();
            });
        });


    };


    shoppingCart.addAllPreviewListener = function(){
        $('.prod_icon_clickable').click(function(e){
            e.stopPropagation();
            var item = $(this).closest(".js-product-item");
            shoppingCart.previewHandler(item);
        });
    };
    shoppingCart.addPreviewListener = function(tmpl){
        $('.prod_icon_clickable',tmpl).click(function(e){
            e.stopPropagation();
            shoppingCart.previewHandler(tmpl);
        })
    };

    shoppingCart.addAllCountChangeListener = function(){

        $('.countChangeActionAdd' ).click(function(e){
            e.stopPropagation();
            shoppingCart.countChangeAddHanlder(this);
        });

        $('.countChangeActionMinus' ).click(function(e){
            e.stopPropagation();
            shoppingCart.countChangeMinusHanlder(this);
        });
    };

    shoppingCart.getShopcartCountByItemID = function(itemId){

        for (var cates in this.shoppingItemsCategraysDict) {
            var items = this.shoppingItemsCategraysDict[cates];
            for (var item in items) {
                var itemdetail = items[item];
                if (item == itemId || itemdetail.id == itemId)return itemdetail.quantity;
            }
        }
        return undefined;
    };

    // events listed here

    shoppingCart.countChangeAddHanlder = function (ele) {

        var prodcut = $(ele).closest(".js-product-item");
        if (!prodcut)return;
        var id = $('.js-product-item-id', prodcut).data('value');

        // we should listen for all same id
        $('.js-product-item[id="'+ id + '"]').each(function(idx, prod){

                var qauntity = $('.js-product-item-quantity', prod).text();

                qauntity = parseInt(qauntity) + 1;

                $('.js-product-item-quantity', prod).text(qauntity);

                $(".product_stepper_count",prod).removeClass('hidden');
                $(".product_stepper_minus",prod).removeClass('hidden');

            }
        );

        var name = $('.js-product-item-name', prodcut).data('value'),
            price = $('.js-product-item-price', prodcut).data('value'),
            qauntity = $('.js-product-item-quantity', prodcut).text(),
            id = $('.js-product-item-id', prodcut).data('value'),
            cateId = $('.js-product-category-id', prodcut).data('value'),
            pic_url = $('.prod_icon', prodcut).data('imageurl');

        if(cateId == undefined){
            cateId = shoppingCart.findCateIdForProductId(id);
        }

        var dataFields = {
            'quantity': qauntity,
            'id': id,
            'price': price,
            'name': name,
            'category_id': cateId,
            'pic_url':pic_url
        }

        shoppingCart.updateCategrayDictOnProductCountChange(dataFields, 'add');

        shoppingCart.updateTotal();

        shoppingCart.saveShoppingCart();

    };


    shoppingCart.countChangeMinusHanlder = function (ele, options) {

        var deleteItemWhenMinusToZero = options && options.deleteItemWhenMinusToZero || false;
        var prodcut = $(ele).closest(".js-product-item");
        if (!prodcut)return;

        var id = $('.js-product-item-id', prodcut).data('value');
        // we should listen for all same id
        $('.js-product-item[id="'+ id + '"]').each(function(idx, prod){

                var qauntity = $('.js-product-item-quantity', prod).text();

                qauntity = parseInt(qauntity) - 1 > 0 ? parseInt(qauntity) - 1 : 0;

                $('.js-product-item-quantity', prod).text(qauntity);

                if (qauntity == 0) {
                    if (deleteItemWhenMinusToZero) {
                        prodcut.remove();
                    }
                    $(".product_stepper_count",prod).addClass('hidden');
                    $(".product_stepper_minus",prod).addClass('hidden');
                }

            }
        );

        var id = $('.js-product-item-id', prodcut).data('value'),
            qauntity = $('.js-product-item-quantity', prodcut).text(),
            cateId = $('.js-product-category-id', prodcut).data('value');

        if(!cateId){
            cateId = shoppingCart.findCateIdForProductId(id);
        }

        var dataFields = {
            'quantity': qauntity,
            'id': id,
            'category_id': cateId
        }

        shoppingCart.updateCategrayDictOnProductCountChange(dataFields, 'minus');

        shoppingCart.updateTotal();

        shoppingCart.saveShoppingCart();

    };

    window.shoppingCart = shoppingCart;

}(window, document));

/************ HTML5 Local Storage Support *************/
(function () {
    if (!this.localStorage)if (this.globalStorage)try {
        this.localStorage = this.globalStorage
    } catch (e) {
    } else {
        var a = document.createElement("div");
        a.style.display = "none";
        document.getElementsByTagName("head")[0].appendChild(a);
        if (a.addBehavior) {
            a.addBehavior("#default#userdata");
            var d = this.localStorage = {length: 0, setItem: function (b, d) {
                a.load("localStorage");
                b = c(b);
                a.getAttribute(b) || this.length++;
                a.setAttribute(b, d);
                a.save("localStorage")
            }, getItem: function (b) {
                a.load("localStorage");
                b = c(b);
                return a.getAttribute(b)
            },
                removeItem: function (b) {
                    a.load("localStorage");
                    b = c(b);
                    a.removeAttribute(b);
                    a.save("localStorage");
                    this.length = 0
                }, clear: function () {
                    a.load("localStorage");
                    for (var b = 0; attr = a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);
                    a.save("localStorage");
                    this.length = 0
                }, key: function (b) {
                    a.load("localStorage");
                    return a.XMLDocument.documentElement.attributes[b]
                }}, c = function (a) {
                return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
                    "-")
            };
            a.load("localStorage");
            d.length = a.XMLDocument.documentElement.attributes.length
        }
    }
})();


