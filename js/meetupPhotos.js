"use strict";
function photosloaded(data) {
    var first = true;
    var images = data.data
        .filter(function (item) { return !!item.photo_album.event.id && !!item.caption && item.caption.indexOf("#site") > -1; })
        .map(function (result) {
        var div = document.createElement('div');
        div.classList.add('carousel-item');
        div.classList.add('carousel-image');
        if (first) {
            div.classList.add("active");
            first = false;
        }
        var img = document.createElement('img');
        img.classList.add('d-block');
        img.classList.add('w-100');
        img.classList.add('border');
        img.classList.add('border-secondary');
        img.classList.add('lazy');
        img.setAttribute('data-src', result.photo_link);
        img.alt = result.caption || "Meetup photo from " + result.member.name;
        div.appendChild(img);
        return div;
    });
    var target = $('#meetupPhotosCarousel').find('.carousel-inner');
    target.html('');
    target.append(images);
    window.myLazyLoad.update();
}
window.loadEvents = function () {
    $.ajax({
        url: 'https://api.meetup.com/developerug/photos?&sign=true&photo-host=secure&page=20',
        dataType: "jsonp",
        jsonpCallback: "photosloaded"
    });
};
