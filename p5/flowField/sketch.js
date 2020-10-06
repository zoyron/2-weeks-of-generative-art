const ACCEL_MAG = 0.01;

let fpsText;
let fpsLastUpdate;

let flowField;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  fpsText = createP('FPS:').style('color', '#AAA');
  
  colorMode(RGB, 100);
  
  flowField = new FlowField();
  
  addParticles();
}

function addParticles() {
	for (let y = 0; y < height; y += 20) {
    for (let x = 0; x < width; x += 20) {
      particles[particles.length] = new Particle(x, y);
    }
  }
}

function draw() {
  background(0,7);
  drawDebug();
  
  if (mouseIsPressed) {
    particles[particles.length] = new Particle(mouseX, mouseY);
  }
  
  flowField.update();
  // flowField.draw();
  
  for (let i = 0; i < particles.length; ++i) {
    let p = particles[i];
    let f = p5.Vector.fromAngle(flowField.getFlow(p.pos.x, p.pos.y)).setMag(ACCEL_MAG);
    p.applyForce(f);
    p.update();
    p.draw();
  }
}

function drawDebug() {
  if (fpsLastUpdate != second()) {
    fpsLastUpdate = second();
		fpsText.html("FPS: " + round(frameRate()));
  }
}
