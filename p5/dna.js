function setup() {
  createCanvas(windowWidth, windowHeight);
}
let t = 0;
function draw() {
  background("#050505");
  translate(width / 2, -5 * height);
  // rotate(PI/4);
  for (let i = 0; i < 800; i++) {
    strokeWeight(2);
    fill(
      50,
      map(xa1(t + i), -100, 100, 0, 200),
      map(xa2(t + i), -100, 100, 0, 200)
    );
    stroke(
      50,
      map(xa1(t + i), -100, 100, 0, 200),
      map(xa2(t + i), -100, 100, 0, 200)
    );
    line(xa1(t + i), ya1(t + i), xa2(t + i) + 20, ya2(t + i) + 20);
    circle(xa1(t + i), ya1(t + i), 5);
    circle(xa2(t + i) + 20, ya2(t + i) + 20, 5);
    strokeWeight(1);
    fill(
      50,
      map(x1(t + i), -100, 100, 200, 0),
      map(x2(t + i), -100, 100, 0, 200)
    );
    stroke(
      50,
      map(x1(t + i), -100, 100, 200, 0),
      map(x2(t + i), -100, 100, 0, 200)
    );
    line(x1(t + i), y1(t + i), x2(t + i) + 20, y2(t + i) + 20);
    circle(x1(t + i), y1(t + i), 5);
    circle(x2(t + i) + 20, y2(t + i) + 20, 5);
    // strokeWeight(1.5);
    // line(xb1(t+i),yb1(t+i),xb2(t+i),yb2(t+i));
    // circle(xb1(t+i),yb1(t+i),5);
    // circle(xb2(t+i),yb2(t+i),5);
  }
  t += 0.25;
}

function x1(t) {
  return sin(t / 10) * 100;
}

function y1(t) {
  return (t / 10) * 100;
}

function x2(t) {
  return -sin(t / 10) * 100;
}

function y2(t) {
  return (t / 10) * 100;
}

function xa1(t) {
  return -cos(t / 10) * 100;
}

function ya1(t) {
  return (t / 10) * 100;
}

function xa2(t) {
  return cos(t / 10) * 100;
}

function ya2(t) {
  return (t / 10) * 100;
}

function xb1(t) {
  return -(cos(t / 10) + sin(t / 10)) * 100;
}

function yb1(t) {
  return (t / 10) * 100;
}

function xb2(t) {
  return (cos(t / 10) + sin(t / 10)) * 100;
}

function yb2(t) {
  return (t / 10) * 100;
}
