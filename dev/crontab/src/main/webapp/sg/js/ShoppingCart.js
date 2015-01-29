(function (window, document) {


    var shoppingCart = {

    };

    shoppingCart.shoppingItemsArray = [];
    shoppingCart.shoppingItemsCategraysDict = {};
    // special fields for items
    shoppingCart.reservedFields = ['quantity', 'id', 'price', 'name', 'shipping', 'tax', 'taxRate'];


    shoppingCart.getShoppingItemById = function(id){
        var data = null,
            me = this;
        $.each(me.shoppingItemsArray, function (idx,item) {
            if (item.id && item.id == id) {
                data = item;
            }
        });
        return data;
    }

    shoppingCart.incrementShoppingItemById = function(id,amount){

        var me = this;
        var diff = amount || 1;
        diff = parseInt(diff, 10);

        $.each(me.shoppingItemsArray, function (idx,item) {
            if (item.id && item.id == id) {
                item.quantity += diff;
            }
        });
        return;
    }

    shoppingCart.decrementShoppingItemById = function(id,amount){

        var me = this;
        var diff = amount || 1;
        diff = parseInt(diff, 10);

        var array = [];
        $.each(me.shoppingItemsArray, function (idx,item) {
            array.push(item);
            if (item.id && item.id == id) {
                item.quantity -= diff;
                if(item.quantity <= 0){
                    item.quantity = 0;
                    array.pop();
                }
            }
        });
        me.shoppingItemsArray = array;
        return;
    }

    shoppingCart.setAmountOfShoppingItemById = function(id,amount){

        var me = this;
        var diff = amount || 1;
        diff = parseInt(diff, 10);
        if(diff < 0)return;

        $.each(me.shoppingItemsArray, function (idx,item) {
            if (item.id && item.id == id) {
                item.quantity = diff;
            }
        });
        return;
    }

    shoppingCart.getTotalPrice = function(){

        var total = 0.0;

        $.each(this.shoppingItemsArray, function (idx,item) {
            total += parseFloat(item.price || 0.0) * parseInt(item.quantity || 0);
        });
        return total/100.0;
    },

    shoppingCart.getTotalQuantity = function(){

        var total = 0;

        $.each(this.shoppingItemsArray, function (idx,item) {
            total +=  parseInt(item.quantity);
        });
        return total;
    },

    shoppingCart.addNewItem = function(options){
        var data = {},
            me = this;
        // already exist
        if(me.getShoppingItemById(options.id)){
            me.incrementShoppingItemById(options.id);
            return;
        }

        $.each(me.reservedFields, function (idx,field) {
            var key = field;
            if (options[key]) {
                data[key] = options[key];
            }
        });
        me.shoppingItemsArray.push(data);

        return data;
    },

    shoppingCart.empty = function(){

        this.shoppingItemsArray = [];
        this.shoppingItemsCategraysDict = {};

        this.saveShoppingCart();

    }
    // storage
    shoppingCart.saveShoppingCart = function () {

        var items = {},me = this;
        localStorage.setItem("shopping_items", JSON.stringify(me.shoppingItemsArray));
        localStorage.setItem("categray_dict", JSON.stringify(me.shoppingItemsCategraysDict));
    },

     shoppingCart.loadShoppingCart = function () {

        // empty without the update
        var items = localStorage.getItem("shopping_items");
         var categraies = localStorage.getItem("categray_dict");

        if (!items) {
            return;
        }

        // we wrap this in a try statement so we can catch
        // any json parsing errors. no more stick and we
        // have a playing card pluckin the spokes now...
        // soundin like a harley.
        try {

            this.shoppingItemsArray = JSON.parse(items);
            this.shoppingItemsCategraysDict = JSON.parse(categraies);

        } catch (e){
            console.error( "Error Loading data: " + e );
        }
    },



        shoppingCart.productsEnoughtToShip = function(){

            var definedMinFreeDelivery = 20;

            var totolp = parseFloat(shoppingCart.getTotalPrice());

            return totolp >= definedMinFreeDelivery;
        }

        shoppingCart.updateTotal = function (){

            var definedMinFreeDelivery = 20;
            var totolp = parseFloat(shoppingCart.getTotalPrice());

            if(totolp < definedMinFreeDelivery){

                var number = Math.round( (definedMinFreeDelivery - totolp) * 100) / 100;
                $(".js-checkout-hit").html('差 <span style="font-weight: 100;padding-left: 0.3em;padding-right: 0.3em;font-size: 18px">' + number + ' </span> 元起送');
                $(".js-confirm-hit").html('差 <span style="font-weight: 100;padding-left: 0.3em;padding-right: 0.3em;font-size: 18px">' + number + ' </span> 元起送');

                $(".js-cart-checkout").css({'background-color':'#7c7d80'});
            }else{
                $(".js-checkout-hit").css({'font-weight': 100, 'padding-left': '0.3em', 'padding-right': '0.3em', 'font-size': '18px'});
                $(".js-checkout-hit").text('去结算');

                $(".js-cart-checkout").css({'background-color':'#F54447'});

                $(".js-confirm-hit").css({'font-weight': 100, 'padding-left': '0.3em', 'padding-right': '0.3em', 'font-size': '18px'});
                $(".js-confirm-hit").text('确定');
            }
            $("#js-shop-total-price").text(totolp);
            $("#js-shop-total-count").text(shoppingCart.getTotalQuantity());

            // update categray shop list
            var me = this;
            $('.shop-categray').each(function(idx,item){

                var cid = $(item).data('categray-id');
                if(cid && me.shoppingItemsCategraysDict && me.shoppingItemsCategraysDict[cid+'']){
                    var total = 0;
                    for(var prop in me.shoppingItemsCategraysDict[cid+'']){
                        total += me.shoppingItemsCategraysDict[cid+''][prop];
                    }
                    if(total >0){
                        $('.shop-categray-item-edge',item).removeClass('hidden');
                        $('.shop-categray-item-edge',item).text(parseInt(total));
                    }else{
                        $('.shop-categray-item-edge',item).addClass('hidden');
                    }
                }
            })
        }


    shoppingCart.updateCategrayDictOnProductCountChange = function(product,id,qauntity,action){

        // update categray list
        var categray = $(product).closest(".js-shop-product-categray-list");
        if(!categray)return;
        var cateId = categray.data('categray-id');
        this.shoppingItemsCategraysDict = this.shoppingItemsCategraysDict || {};

        this.shoppingItemsCategraysDict[cateId+''] = this.shoppingItemsCategraysDict[cateId+''] || {};
        this.shoppingItemsCategraysDict[cateId+''][id+''] = parseInt(qauntity);

    }

    shoppingCart.getItemString = function(){
        var items = [];
        for (var idx = 0; idx < shoppingCart.shoppingItemsArray.length; idx++) {
            items.push({'item_id': shoppingCart.shoppingItemsArray[idx].id, "count": shoppingCart.shoppingItemsArray[idx].quantity,
                'price': shoppingCart.shoppingItemsArray[idx].price, 'name': shoppingCart.shoppingItemsArray[idx].name,
                'pic_url': shoppingCart.shoppingItemsArray[idx].pic_url});
        }
        return JSON.stringify(items);
    }



   // events listed here

    shoppingCart.countChangeAddHanlder = function(ele){

        var prodcut = $(ele).closest( ".js-product-item");

        if(!prodcut)return;

        var name = $('.js-product-item-name',prodcut).data('value'),
            price = $('.js-product-item-price',prodcut).data('value'),
            qauntity = $('.js-product-item-quantity',prodcut).text(),
            id = $('.js-product-item-id',prodcut).data('value');

        qauntity = parseInt(qauntity) + 1;

        $('.js-product-item-quantity',prodcut).text(qauntity);

        shoppingCart.addNewItem({
            'quantity': qauntity,
            'id': id,
            'price': price,
            'name':name
        });

        $('.countChangeAction',prodcut).removeClass('hidden');

        shoppingCart.updateCategrayDictOnProductCountChange(prodcut,id,qauntity,'add');

        shoppingCart.updateTotal();

        $(ele).siblings( ".product_stepper_count").removeClass('hidden');
        $(ele).siblings( ".product_stepper_minus").removeClass('hidden');
    }

    shoppingCart.countChangeMinusHanlder = function(ele){

        var prodcut = $(ele).closest( ".js-product-item");

        if(!prodcut)return;

        var id = $('.js-product-item-id',prodcut).data('value'),
            qauntity = $('.js-product-item-quantity',prodcut).text();

        qauntity = parseInt(qauntity) - 1 > 0 ? parseInt(qauntity) - 1:0;

        $('.js-product-item-quantity',prodcut).text(qauntity);

        shoppingCart.decrementShoppingItemById(id);

        shoppingCart.updateCategrayDictOnProductCountChange(prodcut,id,qauntity,'minus');

        shoppingCart.updateTotal();

        if(qauntity == 0 ){
            $(ele).siblings(".product_stepper_count").addClass('hidden');
            $(ele).addClass('hidden');
        }
    }

    shoppingCart.countChangeResetHanlder = function(ele){

        var prodcut = $(ele).closest( ".js-product-item");

        if(!prodcut)return;

        var id = $('.js-product-item-id',prodcut).data('value'),
            qauntity = parseInt($(ele).text()),
            name = $('.js-product-item-name',prodcut).data('value'),
            price = $('.js-product-item-price',prodcut).data('value');

        // in case this is the first set count
        shoppingCart.addNewItem({
            'quantity': qauntity,
            'id': id,
            'price': price,
            'name':name
        });

        shoppingCart.setAmountOfShoppingItemById(id, qauntity);

        shoppingCart.updateCategrayDictOnProductCountChange(prodcut,id,qauntity,'set');

        shoppingCart.updateTotal();
    }

    window.shoppingCart = shoppingCart;

}(window, document));

/************ HTML5 Local Storage Support *************/
(function () {if (!this.localStorage)if (this.globalStorage)try {this.localStorage=this.globalStorage}catch(e) {}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if (a.addBehavior) {a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function (b,d) {a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function (b) {a.load("localStorage");b=c(b);return a.getAttribute(b)},
    removeItem:function (b) {a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length=0},clear:function () {a.load("localStorage");for (var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function (b) {a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function (a) {return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
    "-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();

// util methods

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
