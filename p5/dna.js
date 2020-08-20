function setup() {
  createCanvas(windowWidth, windowHeight);
}
let t = 0;
function draw() {
  background("#fff");
  translate(width / 2, -5 * height);
  stroke("#0f0f0f");
  strokeWeight(1);
  for (let i = 0; i < 1000; i++) {
    line(x1(t + i), y1(t + i), x2(t + i) + 20, y2(t + i) + 20);

    fill("#0f0f0f");
    circle(x1(t + i), y1(t + i), 3);
    circle(x2(t + i) + 20, y2(t + i) + 20, 3);
  }
  t += 0.25 / 2;
}

function x1(t) {
  return sin(t / 15) * 115;
}

function y1(t) {
  return (t / 15) * 115;
}

function x2(t) {
  return -sin(t / 15) * 115;
}

function y2(t) {
  return (t / 15) * 115;
}
