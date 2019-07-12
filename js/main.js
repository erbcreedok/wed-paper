console.log('hello world');
console.log($('figure'));
$('figure.book').click(function () {
  console.log(this);
  $(this).addClass('open')
});
