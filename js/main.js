console.log('hello world');
$('.book-wrap').click(function () {
  console.log(this);
  $(this).addClass('open');
  $('.area').addClass('spaced');
  setTimeout(function () {
    $('.book-wrap').addClass('hide-book');
  }, 1100)
});
