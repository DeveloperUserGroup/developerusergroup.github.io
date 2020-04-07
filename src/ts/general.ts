$(function () {
    window.version = '0.3';

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
});
