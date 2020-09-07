const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

// movement of mouse
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 150) * (canvas.width / 150),
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// class of particles

class Particle {
  constructor(x, y, dirX, dirY, size, col) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.col = col;
  }
  // method to draw individual particle

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#001e31";
    ctx.fill();
  }
  // check particle position
  update() {
    if (this.x < 0 || this.x > canvas.width) this.dirX = -this.dirX;
    if (this.y < 0 || this.y > canvas.height) this.dirY = -this.dirY;

    // check for collision detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10)
        this.x += 10;
      if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
        this.y += 10;
      if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
    }
    // move particle
    this.x += this.dirX;
    this.y += this.dirY;
    // draw particle
    this.draw();
  }
}

// create particle array

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 1650;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 6 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let dirX = Math.random() * 3.5 - 2;
    let dirY = Math.random() * 3.5 - 2;
    let col = "#001e31";
    particlesArray.push(new Particle(x, y, dirX, dirY, size, col));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

function connect() {
  let opacityVal = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityVal = 0.9 - distance / 20000;
        ctx.strokeStyle = "rgba(0,30,75," + opacityVal + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 100) * (canvas.width / 100);
  init();
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();
