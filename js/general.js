"use strict";
$(function () {
    window.version = '0.2';
    /* -=-=-=-=- THIS IS FOR THE FOOTER -=-=-=-=-=-=-=- */
    $("#currentYear").text((new Date()).getFullYear());
    /* -=-=-=-=- THIS IS USED ON UPCOMING ONLY -=-=-=-=-=-=-=- */
    if (window.loadEvents) {
        window.loadEvents();
    }
    /* -=-=-=-=- THIS IS USED FOR THE NAVBAR -=-=-=-=-=-=-=- */
    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
    /* -=-=-=-=- THIS IS FOR LAZY LOADING OF IMAGES -=-=-=-=-=-=-=- */
    window.myLazyLoad = new LazyLoad({
        elements_selector: ".lazy"
    });
    /* -=-=-=-=- THIS IS FOR GOOGLE ANALYTICS -=-=-=-=-=-=-=- */
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'UA-123750504-1');
});
