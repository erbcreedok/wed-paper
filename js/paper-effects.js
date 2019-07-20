var $paper = $('.message-wrap');
var $folded = $('.message-paper-wrap').oriDomi({
  hPanels: 5,
  touchMoveCallback,
});
var folded = $folded.oriDomi(true);
folded.stairs(70, 'top');

function touchMoveCallback(c, e) {
  if (c < 30) {
    folded.setSpeed(500).unfold();
    folded.disableTouch();
    $paper.addClass('folded');
  }
}
