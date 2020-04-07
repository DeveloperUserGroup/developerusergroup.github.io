function photosloaded(data: meetup.Photos) {
    let first = true;
    const images = data.data
        .sort((a, b) => b.created - a.created)
        .filter(item => !!item.caption && item.caption.toLowerCase().indexOf("#site") >= 0)
        .map(result => {
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            div.classList.add('carousel-image');
            if (first) {
                div.classList.add("active");
                first = false;
            }

            const img = document.createElement('img');
            img.classList.add('d-block');
            img.classList.add('w-100');
            img.classList.add('border');
            img.classList.add('border-secondary');
            img.classList.add('lazy');
            img.setAttribute('data-src', result.photo_link);
            img.alt = result.caption || `Meetup photo from ${result.member.name}`;

            div.appendChild(img);
            return div;
        });

    const target = $('#meetupPhotosCarousel').find('.carousel-inner');
    target.html('');
    target.append(images)
    window.myLazyLoad.update();
}

function getPhotoCount(data: meetup.Photos) {
    const pageSize = 200;
    const offSet = Math.floor(data.meta.total_count / pageSize) - 1;
    $.ajax({
        url: `https://api.meetup.com/developerug/photos?&sign=true&photo-host=secure&page=${pageSize}&offset=${offSet}`,
        dataType: "jsonp",
        jsonpCallback: "photosloaded"
    });
}

window.loadEvents = () => {
    $.ajax({
        url: 'https://api.meetup.com/developerug/photos?&sign=true&photo-host=secure&page=1',
        dataType: "jsonp",
        jsonpCallback: "getPhotoCount"
    });
}