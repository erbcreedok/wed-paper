var $bookFront = $('.book-front');
var $bookBack = $('.book-back');
var hasPointer = matchMedia('(pointer:fine)').matches;

if (!hasPointer) {
  $('body').css('cursor', 'pointer');
}

document.addEventListener('click', function () {
  if (!$bookFront.hasClass('get-away')) {
    if ($bookFront.hasClass('pre-open') || hasPointer) {
      $bookFront.addClass('get-away');
      $bookBack.addClass('book-full');
    } else {
      $bookFront.addClass('pre-open');
    }
  }
});
