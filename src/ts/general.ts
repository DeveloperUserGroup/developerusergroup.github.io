$(function () {
    $("#currentYear").text((new Date()).getFullYear());

    if (window.loadEvents) {
        window.loadEvents();
    }

    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
});
