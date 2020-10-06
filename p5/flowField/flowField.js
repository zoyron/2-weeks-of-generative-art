const SCL = 40;
const NOISE_INC = 0.005;
const TIME_SCALE = 0.5;

function FlowField() {
  this.field = [];
  this.cols = floor(width / SCL);
  this.rows = floor(height / SCL);
  
  this.init();
}

FlowField.prototype.init = function() {
  for (let x = 0; x < this.cols; ++x) {
    this.field[x] = [];
    for (let y = 0; y < this.rows; ++y) {
      this.field[x][y] = 0;
    }
  }
}

FlowField.prototype.update = function() {
  let yNoise = 0;
  for (let y = 0; y < this.rows; ++y) {
    let xNoise = 0;
    for (let x = 0; x < this.cols; ++x) {
      let n = noise(xNoise, yNoise, frameCount / 60 * TIME_SCALE);
      this.field[x][y] = n * TWO_PI * 2;
      xNoise += NOISE_INC * SCL;
    }
    yNoise += NOISE_INC * SCL;
  }
}

FlowField.prototype.draw = function() {
  stroke(0, 0, 10);
  strokeWeight(1);
  for (let y = 0; y < this.rows; ++y) {
    for (let x = 0; x < this.cols; ++x) {
      push();
      {
        translate((x + 0.5) * SCL, (y + 0.5) * SCL);
        rotate(this.field[x][y]);
        line(SCL * -0.25, 0, SCL * 0.25, 0);
        line(SCL * 0.25, 0, SCL * 0.15, SCL * 0.1);
        line(SCL * 0.25, 0, SCL * 0.15, SCL * -0.1);
      }
      pop();
    }
  }
}

FlowField.prototype.getFlow = function(x, y) {
  let sx = x / SCL;
  let sy = y / SCL;
  
  let ix0 = wrap(round(sx) - 1, 0, this.cols);
  let ix1 = wrap(ix0 + 1, 0, this.cols);
  let iy0 = wrap(round(sy) - 1, 0, this.rows);
  let iy1 = wrap(iy0 + 1, 0, this.rows);
  
  let tx = wrap(sx, 0.5, 1.5) - 0.5;
  let ty = wrap(sy, 0.5, 1.5) - 0.5;
  
  let m = lerpAngle(this.field[ix0][iy0], this.field[ix1][iy0], tx);
  let n = lerpAngle(this.field[ix0][iy1], this.field[ix1][iy1], tx);
  
  return lerpAngle(m, n, ty);
}
    
function lerpAngle(a, b, t) {
  let d = wrap(b - a, -PI, PI);
  return wrap(a + (d * t), 0, TWO_PI);
}

function wrap(v, min, max) {
  let d = max - min;
  while (v < min) v += d;
  while (v >= max) v -= d;
  return v;
}
