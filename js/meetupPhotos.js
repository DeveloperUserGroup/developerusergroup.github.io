"use strict";
function photosloaded(data) {
    var first = true;
    var images = data.data
        .sort(function (a, b) { return b.created - a.created; })
        .filter(function (item) { return !!item.caption && item.caption.toLowerCase().indexOf("#site") >= 0; })
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
function getPhotoCount(data) {
    var pageSize = 200;
    var offSet = Math.floor(data.meta.total_count / pageSize) - 1;
    $.ajax({
        url: "https://api.meetup.com/developerug/photos?&sign=true&photo-host=secure&page=" + pageSize + "&offset=" + offSet,
        dataType: "jsonp",
        jsonpCallback: "photosloaded"
    });
}
window.loadEvents = function () {
    $.ajax({
        url: 'https://api.meetup.com/developerug/photos?&sign=true&photo-host=secure&page=1',
        dataType: "jsonp",
        jsonpCallback: "getPhotoCount"
    });
};
