var $bookFront = $('.book-front');
if (matchMedia('(pointer:fine)').matches) {

} else {
  $bookFront.addClass(function() {
    setTimeout(function () {
      $bookFront.addClass('pre-open');
    }, 2000);
  })
}
