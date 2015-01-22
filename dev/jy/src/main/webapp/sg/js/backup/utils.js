// util methods

function warningOfNeccessInput(input) {
    $(input).css({'border': 'solid 1px red'});
    $(input).focus();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function makePost(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function makeGo(path){
    document.location.replace(path);
}

function makeHerf(path){
    document.location.url = path;
}


function addSpinner(){
    $('<div class="overlay" id="commonSpinner"><div class="spinner"><i class="fa fa-spinner fa-spin fa-2x"></i></div></div>').appendTo(document.body);
}

function removeSpinner(){
    $('#commonSpinner').remove();
}


function hideNoResultsDisplay(container){

    $('.no-result-display').remove();

}

function addNoResultsDisplay(container){

   $(container).append('<div class="no-result-display" id="noResultCommonDisplay" style="text-align: center">暂时没有商品</div>');

}

$(document).ready(function () {

    $('.js-addAddress input').blur(function ()          //whenever you click off an input element
    {
        if (!$(this).val()) {                      //if it is blank.
            $(this).css({'border': 'solid 1px red'});
        } else {
            $(this).css({'border': 0});
        }
    });
});

