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
function loadData(id, data, city) {
    var card = $(".upcomingFor" + id);
    var sortedEventsForCity = data.results.filter(function (value) { return value.venue.city === city; }).sort(function (a, b) { return a.time - b.time; });
    var time;
    if (sortedEventsForCity.length > 0) {
        var firstEvent = sortedEventsForCity[0];
        time = firstEvent.time;
        var eventDate = new Date(firstEvent.time);
        var when = eventDate.toLocaleDateString("en-za", dateDisplayOptions) + " " + eventDate.toLocaleTimeString("en-za");
        var nextEvent = {
            when: when,
            title: cleanName(firstEvent.name),
            description: firstEvent.description,
            url: firstEvent.event_url,
            going: firstEvent.yes_rsvp_count,
            maybe: firstEvent.maybe_rsvp_count
        };
        var eventInfo = card.find(".eventInfo");
        var eventInfoText_1 = eventInfo.html();
        Object.entries(nextEvent).forEach(function (keyValue) {
            var key = keyValue[0];
            var value = keyValue[1].toString();
            eventInfoText_1 = eventInfoText_1.replace("!!" + key + "!!", value);
        });
        eventInfo.html(eventInfoText_1);
    }
    else {
        card.find(".noEvents").show();
    }
    return { card: card, time: time };
}
function loaded(data) {
    var jhb = loadData("jhb", data, "Johannesburg");
    var pta = loadData("pta", data, "Pretoria");
    var cpt = loadData("cpt", data, "Cape Town");
    $('#upcomingEvents').append([jhb, pta, cpt].sort(function (a, b) { return a.time - b.time; }).map(function (item) {
        item.card.find(".upcomingLoading").hide();
        item.card.find(".eventInfo").removeClass('eventInfo');
        return item.card.detach();
    }));
}
window.loadEvents = function () {
    $.ajax({
        url: 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=developerug&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=42777762&sig=f0aecc535e990e20bd78cd1a919ccc80af6d3bd5&callback=callback',
        dataType: "jsonp",
        jsonpCallback: "loaded"
    });
};
