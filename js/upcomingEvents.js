"use strict";
var dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
function cleanName(name) {
    var prefixesToClean = ["JHB:", "PTA:", "Cape Town:"];
    for (var _i = 0, prefixesToClean_1 = prefixesToClean; _i < prefixesToClean_1.length; _i++) {
        var prefix = prefixesToClean_1[_i];
        if (name.indexOf(prefix) == 0) {
            return name.substring(prefix.length);
        }
    }
    return name;
}
function loadData(id, event) {
    var card = $(".upcomingFor".concat(id));
    var time = event.time;
    var eventDate = new Date(event.time);
    var when = "".concat(eventDate.toLocaleDateString("en-za", dateDisplayOptions), " ").concat(eventDate.toLocaleTimeString("en-za"));
    var map = "https://www.google.com/maps/@".concat(event.venue.lat, ",").concat(event.venue.lon, ",15z");
    var nextEvent = {
        when: when,
        map: map,
        title: cleanName(event.name),
        description: event.description,
        url: event.link,
        going: event.yes_rsvp_count,
        venue: event.venue.name
    };
    var eventInfo = card.find(".eventInfo");
    var eventInfoText = eventInfo.html();
    Object.entries(nextEvent).forEach(function (keyValue) {
        var _a;
        var key = keyValue[0];
        var value = ((_a = keyValue[1]) !== null && _a !== void 0 ? _a : "").toString();
        eventInfoText = eventInfoText.replace("!!".concat(key, "!!"), value);
    });
    eventInfo.html(eventInfoText);
    return { card: card, time: time };
}
function loaded(data) {
    var sortedEvents = data.data.sort(function (a, b) { return a.time - b.time; });
    var first = loadData("first", sortedEvents[0]);
    var second = loadData("second", sortedEvents[1]);
    var third = loadData("third", sortedEvents[2]);
    $('#upcomingEvents').append([first, second, third].map(function (item) {
        item.card.find(".upcomingLoading").hide();
        item.card.find(".eventInfo").removeClass('eventInfo');
        return item.card.detach();
    }));
}
window.loadEvents = function () {
    $.ajax({
        url: 'https://api.meetup.com/developerug/events?&sign=true&photo-host=secure&page=20',
        dataType: "jsonp",
        jsonpCallback: "loaded"
    });
};
