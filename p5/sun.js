let xoff = 0;

class Walker {
   constructor() {
    this.x = map(sin(xoff),-1,1,-150,150);
    this.y = map(cos(xoff),-1,1,-150,150);
    this.xSpeed = random(-2,1);
    this.ySpeed = random(-2,1);
  }
  
  createWalker() {
    
    strokeWeight(1);
    stroke(map(this.x,-width,width,155,255),map(this.y,0,height,155,0),map(this.x+this.y,0,width+height,15,155),20);
    // stroke(map(this.x,-width,width,155,255),30)
    this.X = map(sin(noise(xoff*0.075,this.y*0.075)),-1,1,-2,2);
    this.Y = map(sin(noise(this.x*0.075,xoff*0.075)),-1,1,-2,2);
  }
  
  moveWalker() {
    // if(this.x<-width || this.x>width){
    //   this.X*=-1;
    //   this.xSpeed*=-1;
    // }
    // if(this.y<-height || this.y>height) {
    //   this.Y*=-1;
    //   this.ySpeed*=-1;
    // }
    this.x+= this.X+this.xSpeed;
    this.y+= this.Y+this.ySpeed;
    
  }
};
let obj;
let arr = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#000000");
  // colorMode(RGB,50);
  strokeCap(ROUND);
  blendMode(ADD);
}

function draw() {
  for(let i = 0;i<random(200);i++) {
     xoff+=0.05;
    obj = new Walker();
    arr.push(obj);
  }  
  translate(width/2,height/2);
  // rotate(xoff/2);
  beginShape();
  for(let i = 0;i<arr.length;i++){
    noFill();
    arr[i].createWalker();
    line(arr[i].x,arr[i].y, arr[i].x-arr[i].xSpeed, arr[i].y-arr[i].ySpeed); 
    // line(arr[i].y,arr[i].x, arr[i].y-arr[i].ySpeed, arr[i].x-arr[i].xSpeed); 
    arr[i].moveWalker();
  }
  // endShape();
  xoff+=0.0000005;
  
}
