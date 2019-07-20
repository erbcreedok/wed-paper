var $bookFront = $('.book-front');
var $bookBack = $('.book-back');
var hasPointer = matchMedia('(pointer:fine)').matches;

if (!hasPointer) {
  $('body').css('cursor', 'pointer');
}
console.log({hasPointer});

function openMiniBook () {
  if (!$bookFront.hasClass('get-away')) {
    if (!hasPointer) {
      $bookFront.addClass('pre-open');
      setTimeout(function () {
        $bookFront.addClass('get-away');
        $bookBack.addClass('book-full');
      }, 400);
    } else {
      $bookFront.addClass('get-away');
      $bookBack.addClass('book-full');
    }
  }
}

document.addEventListener('click', openMiniBook);
document.addEventListener('touchmove', openMiniBook)
