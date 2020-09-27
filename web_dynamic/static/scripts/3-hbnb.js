$('document').ready(() => {
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
    if (status === 'success') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('avaliable');
    }
  });

  $.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  type:"POST",
  data: {},
  contentType:"application/json",
  dataType:"json",
  success: (list_places) =>{
    for (let place of list_places) {
      $('.placeontainer').append(
        `<article>
          <div class="title_place">
            <h2>${ place.name }</h2>
            <div class="price_by_night">
            ${ place.price_by_night }
            </div>
          </div>
          <div class="details">
            <div class="max_guest">
              <div class="logo"></div>
              <span>${ place.max_guest } Guests</span>
            </div>
            <div class="number_rooms">
              <div class="logo"></div>
              <span>${ place.number_rooms } Bedroom</span>
            </div>
            <div class="number_bathrooms">
              <div class="logo"></div>
              <span>${ place.number_bathrooms } Bathroom</span>
            </div>
          </div>
          <div class="description">
            ${ place.description }
          </div>
        </article>`
      )
    }
  }});

  const amenities = {};

  $('div.amenities li input').change(function () {
    if ($(this).is(':checked')) {
      amenities[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      delete amenities[($(this).attr('data-id'))];
    }
    $('div.amenities h4').text(Object.values(amenities).join(', '));
  });
});
