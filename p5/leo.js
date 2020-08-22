let xoff = 0;
let img;
let testImg;
function preload() {
  img = loadImage("./leo.jpg");
}
class Walker {
  constructor() {
    // this.x = map(noise(xoff), 0, 1, 0, 2);
    // this.y = map(noise(xoff + 10000), 0, 1, 0, 2);
    // this.x = map(noise(xoff), 0, 1, 0, width);
    this.x = random(0, width);
    this.y = 0;
    this.xSpeed = random(-3, 2);
    this.ySpeed = random(-3, 2);
  }

  createWalker() {
    strokeWeight(0.5);
    stroke(color(testImg.get(this.x, this.y)));
    this.X = map(sin(noise(this.x * 0.005, this.y * 0.005)), -1, 1, -2, 2);
    this.Y = map(sin(noise(this.x * 0.005, this.y * 0.005)), -1, 1, -2, 2);
  }

  moveWalker() {
    if (this.x < 0 || this.x > width) {
      this.X *= -1;
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.Y *= -1;
      this.ySpeed *= -1;
    }
    this.x += this.X + this.xSpeed;
    this.y += this.Y + this.ySpeed;
  }
}
let obj;
let arr = [];
function setup() {
  testImg = createImage(img.width, img.height);
  createCanvas(img.width, img.height);
  background("#000");
  img.loadPixels();
  testImg.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      testImg.set(i, j, color(img.get(i, j)));
    }
  }
  testImg.updatePixels();
  strokeCap(SQUARE);
  blendMode(SCREEN);
  for (let i = 0; i < 2500; i++) {
    xoff += 0.05;
    obj = new Walker();
    arr.push(obj);
  }
}

function draw() {
  // translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < arr.length; i++) {
    noFill();
    arr[i].createWalker();
    line(
      arr[i].x,
      arr[i].y,
      arr[i].x - arr[i].xSpeed,
      arr[i].y - arr[i].ySpeed
    );
    arr[i].moveWalker();
  }
  // endShape();
  xoff += 0.0000005;
}
