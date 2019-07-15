const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";
let rid = null;
let gon = 7;// 3,4,5,6....

const colors = [
  "#ba3763",
  "#d34076",
  "#dbb0cc",
  "#fddafa",
  "#fef2fe",
  "#eec0db",
  "#ca809a",
  "#e9d8e8"
];

let m = { x: 0, y: 0 };
let previous = { x: 0, y: 0 };
let scale = 1;
let bool = false;

class Flower {
  constructor(n, pos, scale, parent) {
    this.n = n;
    this.scale = scale;
    this.pos = pos;
    this.width = 40;
    this.height = 40;
    this.color = colors[~~(Math.random() * colors.length)];
    this.parent = parent;

    this.markup();
  }

  markup() {
    this.G = document.createElementNS(SVG_NS, "g");
    this.G.setAttribute("style", `--scale:${this.scale};`);
    let rot = ~~(Math.random() * 180);
    this.G.setAttributeNS(
      null,
      "transform",
      `translate(${this.pos.x},${this.pos.y}) rotate(${rot})`
    );
    this.G.setAttributeNS(null, "fill", this.color);
    let ga = document.createElementNS(SVG_NS, "g");
    ga.setAttribute("class", "a");

    for (let i = 0; i < 2; i++) {
      // left, right
      let g = document.createElementNS(SVG_NS, "g");
      for (let j = 0; j < this.n; j++) {
        let use = document.createElementNS(SVG_NS, "use");
        use.setAttributeNS(SVG_XLINK, "xlink:href", `#petal${this.n}`);
        use.setAttributeNS(null, "width", this.width);
        use.setAttributeNS(null, "height", this.height);

        g.appendChild(use);
      }
      ga.appendChild(g);
    }
    this.G.appendChild(ga);

    this.parent.appendChild(this.G);
  }
}


///////// Initial polygon //////////////

function algorithmPoly(gon, R) {
  let points = [];
  for (let a = 0; a < .7 * Math.PI; a += .1) {
    let r =
      R *
      Math.cos(Math.PI / gon) /
      Math.cos(a % (2 * Math.PI / gon) - Math.PI / gon);

    let x = 2700 + r * Math.cos(a);
    let y = 500 + r * Math.sin(a);
    points.push({ x: x, y: y, r: 5 });
  }
  for (let a = Math.PI; a < 1.3 * Math.PI; a += .1) {
    let r =
      R*2 *
      Math.cos(Math.PI / gon) /
      Math.cos(a % (2 * Math.PI / gon) - Math.PI / gon);

    let x = 9600 + r * Math.cos(a);
    let y = 9600 + r * Math.sin(a);
    points.push({ x: x, y: y, r: 1 });
  }
  for (let a = 1.3 * Math.PI; a > Math.PI; a -= .1) {
    let r =
      R*2 *
      Math.cos(Math.PI / gon) /
      Math.cos(a % (2 * Math.PI / gon) - Math.PI / gon);

    let x = 9600 + r * Math.cos(a);
    let y = 9600 + r * Math.sin(a);
    points.push({ x: x, y: y, r: 1 });
  }
  return points;
}

let points = algorithmPoly(gon, 1500);

let frames = 0;
function Frame() {
  rid = window.requestAnimationFrame(Frame);

  if (frames >= points.length) {
    window.cancelAnimationFrame(rid);
    rid = null;
  }
  m = points[frames];
  let n = 2 + ~~(Math.random() * 4);
  scale = ~~(Math.random() * 12) + 3;

  let flower = new Flower(n, { x: m.x, y: m.y }, scale, svg);
  setTimeout(() => {
    flower.G.setAttribute("class", `_${flower.n}`);
  }, 50);

  frames++;
}

Frame();