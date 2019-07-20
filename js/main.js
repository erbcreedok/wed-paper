$bookWrap = $('.book-wrap');

function openBook() {
  if ($bookWrap.hasClass('open')) return;
  $bookWrap.addClass('open');
  $('.area').addClass('spaced');
  setTimeout(function () {
    $bookWrap.addClass('hide-book');
    setTimeout(function() {
      $('#open-next').click(function () {
        if (!$bookWrap.hasClass('open-next')) {
          setTimeout(function() {$bookWrap.addClass('open-next');});
        }
      });
      $(document).click(function () {
        if ($bookWrap.hasClass('open-next')) {
          setTimeout(function() {$bookWrap.removeClass('open-next');});
        }
      });
    }, 3000);
  }, 1100);
}


$bookWrap.click(openBook);