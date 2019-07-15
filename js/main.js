console.log('hello world');
$('.book-wrap').click(function () {
  console.log(this);
  $(this).addClass('open')
});
