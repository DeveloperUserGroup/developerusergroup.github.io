"use strict";
const dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
function cleanName(name) {
    const prefixesToClean = ["JHB:", "PTA:", "Cape Town:"];
    for (const prefix of prefixesToClean) {
        if (name.indexOf(prefix) == 0) {
            return name.substring(prefix.length);
        }
    }
    return name;
}
function showData(id, data, city) {
    const card = $(`.upcomingFor${id}`);
    const sortedEventsForCity = data.results.filter(value => value.venue.city === city).sort((a, b) => a.time - b.time);
    if (sortedEventsForCity.length > 0) {
        const firstEvent = sortedEventsForCity[0];
        const eventDate = new Date(firstEvent.time);
        const when = `${eventDate.toLocaleDateString("en-za", dateDisplayOptions)} ${eventDate.toLocaleTimeString("en-za")}`;
        const nextEvent = {
            when,
            title: cleanName(firstEvent.name),
            description: firstEvent.description,
            url: firstEvent.event_url,
            going: firstEvent.yes_rsvp_count,
            maybe: firstEvent.maybe_rsvp_count
        };
        const eventInfo = card.find(".eventInfo");
        let eventInfoText = eventInfo.html();
        Object.entries(nextEvent).forEach(keyValue => {
            const key = keyValue[0];
            const value = keyValue[1].toString();
            eventInfoText = eventInfoText.replace(`!!${key}!!`, value);
        });
        eventInfo.html(eventInfoText);
        eventInfo.removeClass('eventInfo');
    }
    else {
        card.find(".noEvents").show();
    }
    card.find(".upcomingLoading").hide();
}
function loaded(data) {
    showData("jhb", data, "Johannesburg");
    showData("pta", data, "Pretoria");
    showData("cpt", data, "Cape Town");
}
window.loadEvents = () => {
    $.ajax({
        url: 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=developerug&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=42777762&sig=f0aecc535e990e20bd78cd1a919ccc80af6d3bd5&callback=callback',
        dataType: "jsonp",
        jsonpCallback: "loaded"
    });
};
