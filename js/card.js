var
  can = true;
  $card = $('.card'),
  $cardContext = $('.card-context'),
  $cardTitle = $('.card-title'),
  $cardSubtitle = $('.card-subtitle'),
  $cardShine = $('.card-shine'),
  $cardShadow = $('.card-shadow'),
  currentMousePos = { x: 0, y: 0 },
  mouseFromCenter = { x: 0, y: 0 },
  idleDegress = {x: null, y: null},
  lastDegress = {x: null, y: null},
  tiltDegress = {x: null, y: null};

function tiltCardByMouse(x, y) {
  // dataContainerOrientation.innerHTML = `x: ${x}, y: ${y}`;
  var
    wHeight= $(window).height(),
    wWidth= $(window).width();

  currentMousePos.x = x;
  currentMousePos.y = y;
  mouseFromCenter.x = currentMousePos.x - (wWidth / 2);
  mouseFromCenter.y = currentMousePos.y - (wHeight / 2);

  var
    around1 = -1 * (currentMousePos.y * 100 / wHeight * 0.2 - 10) + 'deg',
    around2 = (currentMousePos.x * 100 / wWidth * 0.2 - 10) + 'deg',
    trans1 = (currentMousePos.x * 100 / wHeight * 0.3 ) + 'px',
    trans2 = (currentMousePos.y * 100 / wHeight * 0.3 ) + 'px',
    dy = event.pageY - wHeight / 2, //@h/2 = center of poster
    dx = event.pageX - wWidth / 2, //@w/2 = center of poster
    theta = Math.atan2(dy, dx), // угол между курсором и центром картинки в RAD
    angle = theta * 180 / Math.PI - 90,
    mousePositionX = ( currentMousePos.x / wWidth) * 100,
    mousePositionY = 50+( currentMousePos.y / wHeight)*10;

  // угол градиента и "непрозрачность" для эффекта блеска карточки
  $cardShine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (currentMousePos.y / wHeight) * .7 + ') 0%,rgba(255,255,255, 0) 80%)');
  // card pos and angle
  $card.css({
    "-webkit-transform": "translate3d(" + trans1 + ", " + trans2 +", 0) scale(1) rotateX(" + around1 + ") rotateY(" + around2 + ")",
    'background-position': mousePositionX + '%' + ' ' + (currentMousePos.y / wHeight) * 50  + '%'
  });
  // card shadow pos and angle
  $cardShadow.css({"transform": "scale(.9,.9) translateX(" + ((mouseFromCenter.x * -0.02) + 12) + "px) translateY(" + ((mouseFromCenter.y * -0.02) + 12 ) + "px) scale(1.0) rotateY(" + (mouseFromCenter.x / 25) * 0.5 + "deg) rotateX(" + ((mouseFromCenter.y / -25) ) + "deg)" });

  $cardTitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.7) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.65) + "px)"
  });

  $cardSubtitle.css({"transform": "translateX(" + ((mouseFromCenter.x / 25) * 0.5) + "px) translateY(" + ((mouseFromCenter.y / 25) * 1.15) + "px) translateZ(60px)"
  });
}

var scaleX = 1, scaleY = 1;

function tiltCard(x, y, angle, power) {
  if (!can) return;
  var
    around1 = x,
    around2 = -1 * y,
    trans1 = y*-2,
    trans2 = x*-2;

  console.log({angle, power});

  $cardShine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + power  + ') 0%,rgba(255,255,255, 0) 80%)');
  // card pos and angle
  $card.css({
    "-webkit-transform": "translate3d(" + trans1 + "px, " + trans2 +"px, 0) rotateX(" + around1 + "deg) rotateY(" + around2 + "deg)",
    'background-position': (y/30 * 50 + 50) + '%' + ' ' + ((-x)/30 * 50 + 50) + '%'
  });
  // card shadow pos and angle
  // $cardShadow.css({"transform": "translate3d(" + trans1 + "px, " + trans2 +"px, 0) rotateY(" + around2*scaleY+ "deg) rotateX(" + around1*scaleX + "deg)"});
  $cardContext.css({
    "transform": "translateX(" + trans1 * .25 + "px) translateY(" + trans2 * .25 + "px)"
  });
}

function tilt(x, y) {
  if (!idleDegress.x) {
    idleDegress.x = x;
  }
  if (!idleDegress.y) {
    idleDegress.y = y;
  }

  tiltDegress = {x, y};

  x -= idleDegress.x;
  y -= idleDegress.y;

  var
    theta = Math.atan2(-y, x), // угол между курсором и центром картинки в RAD
    angle = theta * 180 / Math.PI;

  tiltCard(x*.5, y*.5, angle, Math.max(Math.abs(y), Math.abs(x)) * .02);

}


if (matchMedia('(pointer:fine)').matches) {
  $(document).mousemove(function(event) {
    tiltCardByMouse(event.pageX, event.pageY);
  });
} else {
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
      tilt(event.beta, event.gamma);
    }, true);
  } else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function () {
      tilt(event.acceleration.x * 2, event.acceleration.y * 2);
    }, true);
  } else {
    window.addEventListener("MozOrientation", function () {
      tilt(orientation.x * 50, orientation.y * 50);
    }, true);
  }

}
