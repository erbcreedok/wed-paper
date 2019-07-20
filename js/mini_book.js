var $bookFront = $('.book-front');
var $bookBack = $('.book-back');
var hasPointer = matchMedia('(pointer:fine)').matches;

if (!hasPointer) {
  $('body').css('cursor', 'pointer');
}

function openMiniBook () {
  if (!$bookFront.hasClass('get-away')) {
    if (!hasPointer) {
      $bookFront.addClass('pre-open');
      setTimeout(function () {
        getAway();
      }, 400);
    } else {
      getAway();
    }
  }
}

function getAway() {
  $bookFront.addClass('get-away');
  $bookBack.addClass('book-full');
  startTilts();
}

document.addEventListener('click', openMiniBook);
document.addEventListener('touchmove', openMiniBook)
