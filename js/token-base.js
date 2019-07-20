const token = document.location.href.split('#')[1];

if (token) {
  $.get(`https://wed-e8b40.firebaseio.com/guests/${token}.json`, function(res) {
    if (res.name) {
      $('.namespace').html(res.name);
      $('#main').fadeIn();
    }
  });
}
