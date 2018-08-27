function photosloaded(data: meetup.PhotoResults) {
    let first = true;
    const images = data.results
        .filter(item => !!item.photo_album.event_id && !!item.caption && item.caption.indexOf("#site") > -1)
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

window.loadEvents = () => {
    $.ajax({
        url: 'https://api.meetup.com/2/photos?offset=0&format=json&group_urlname=developerug&photo-host=public&page=20&fields=&order=time&desc=True&sig_id=42777762&sig=f532b7eaa2f44d7e0a388c8af271fa6da7123c96&callback=callback',
        dataType: "jsonp",
        jsonpCallback: "photosloaded"
    });
}