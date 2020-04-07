const dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function cleanName(name: string): string {
    const prefixesToClean = ["JHB:", "PTA:", "Cape Town:"];
    for (const prefix of prefixesToClean) {
        if (name.indexOf(prefix) == 0) {
            return name.substring(prefix.length);
        }
    }

    return name;
}

function loadData(id: string, event: meetup.Event) {
    const card = $(`.upcomingFor${id}`)
    let time = event.time;
    const eventDate = new Date(event.time);
    const when = `${eventDate.toLocaleDateString("en-za", dateDisplayOptions)} ${eventDate.toLocaleTimeString("en-za")}`
    const map = `https://www.google.com/maps/@${event.venue.lat},${event.venue.lon},15z`
    const nextEvent = {
        when,
        map,
        title: cleanName(event.name),
        description: event.description,
        url: event.link,
        going: event.yes_rsvp_count,
        venue: event.venue.name
    }

    const eventInfo = card.find(".eventInfo");
    let eventInfoText = eventInfo.html();
    Object.entries(nextEvent).forEach(keyValue => {
        const key = keyValue[0];
        const value = (keyValue[1] ?? "").toString()

        eventInfoText = eventInfoText.replace(`!!${key}!!`, value);
    });

    eventInfo.html(eventInfoText);

    return { card, time };
}

function loaded(data: meetup.Events) {
    const sortedEvents = data.data.sort((a, b) => a.time - b.time);
    const first = loadData("first", sortedEvents[0])
    const second = loadData("second", sortedEvents[1])
    const third = loadData("third", sortedEvents[2])

    $('#upcomingEvents').append([first, second, third].map(item => {
        item.card.find(".upcomingLoading").hide();
        item.card.find(".eventInfo").removeClass('eventInfo');
        return item.card.detach();
    }));

}

window.loadEvents = () => {
    $.ajax({
        url: 'https://api.meetup.com/developerug/events?&sign=true&photo-host=secure&page=20',
        dataType: "jsonp",
        jsonpCallback: "loaded"
    });
}