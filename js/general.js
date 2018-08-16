"use strict";
$(function () {
    $("#currentYear").text((new Date()).getFullYear());
    if (window.loadEvents) {
        window.loadEvents();
    }
});
