console.log('hello world');
console.log($('figure'));
$('.book-wrap').click(function () {
  console.log(this);
  $(this).addClass('open')
});
