const SIGMA = 10;
const RHO = 28;
const BETA = 8/3;
const DT = 1/60;
const MAX_LEN = 1200;

let offset = 0;

let p;
let path = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 4, WEBGL);
  colorMode(HSB, 100);
  
  p = createVector(1, 1, 1);
}

function draw() {
  background(0);

  if (!frameRate()) return;
  
  rotateY(frameCount * 0.01);
  translate(0, 0, -250);
  scale(width/80);
  
  let delta = createVector(
	  SIGMA * (p.y - p.x),
  	p.x * (RHO - p.z) - p.y,
  	p.x * p.y - BETA * p.z
  );
  delta.mult(DT);
  
  p.add(delta);
  path.push(p.copy());
  if (path.length > MAX_LEN) {
    path.splice(0, 1);
    ++offset;
  }
  
  strokeWeight(2);
  stroke(255);
  noFill();
  let prev = path[0];
  for (let i = 1; i < path.length; ++i) {
    let next = path[i];
    
    stroke(((i + offset) * 0.1) % 100, 100, 100 - (path.length - i) * (100 / MAX_LEN));
    line(prev.x, prev.y, prev.z, next.x, next.y, next.z);
    prev = next;
  }
}
