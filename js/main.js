$bookWrap = $('.book-wrap');

function openBook() {
  if ($bookWrap.hasClass('open')) return;
  $bookWrap.addClass('open');
  $('.area').addClass('spaced');
  setTimeout(function () {
    $bookWrap.addClass('hide-book');
    $('#open-next').click(function () {
      $bookWrap.addClass('open-next');
    });
  }, 1100);
}

$bookWrap.click(openBook);