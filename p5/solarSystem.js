let zoom = 1;
let drag;
let prevMouse;

let sun;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}

function setup() {
  drag = createVector(0, 0);
  
  createCanvas(windowWidth, windowHeight - 4);
  
  sun = new Body(24, 0, null, color(255));
  m = new Body(5, 60, sun, color(89, 57, 12));
  v = new Body(8, 120, sun, color(122, 108, 74));
  e = new Body(9, 190, sun, color(29, 104, 40));
  new Body(2, 25, e, color(127));
  r = new Body(7, 260, sun, color(112, 50, 33));
  new Body(2, 22, r, color(191));
  new Body(3, 30, r, color(63));
}

function draw() {
  background(0);
  
  translate(width/2 + drag.x, height/2 + drag.y);
  scale(1 / zoom);

  sun.update();
  sun.draw();
}

function mousePressed() {
  prevMouse = createVector(mouseX, mouseY);
}

function mouseDragged() {
  let mousePos = createVector(mouseX, mouseY);
  drag.add(mousePos.copy().sub(prevMouse));
  prevMouse = mousePos.copy();
  
  return false;
}

function mouseWheel(event) {
  zoom += event.delta * 0.0005;
}

//****************************************
// BODY

function Body(radius, distance, parent, color) {
  this.radius = radius;
  this.distance = distance;
  this.orbitLength = distance * 2 * PI;
  this.angle = random(2 * PI);
  this.color = color;
  this.children = [];
  this.parent = parent;
  if (parent) {
    parent.children.push(this);
  }
}

Body.prototype.update = function() {
  let speed = pow((width - this.distance) / (width), 0.5);
  this.angle += (speed / this.orbitLength) * (2 * PI);
  for (let body of this.children) {
    body.update();
  }
}

Body.prototype.draw = function() {
  push();
  stroke(20);
  noFill();
  ellipse(0, 0, this.distance * 2);
  noStroke();
  fill(this.color);
  rotate(-this.angle);
  translate(this.distance, 0);
  ellipse(0, 0, this.radius * 2);
  if (this.parent === sun) {
    fill(0, 0, 0, 220);
    rect(0, -this.radius, this.radius, this.radius * 2);
  }
  for (let body of this.children) {
    body.draw();
  }
  pop();
}
