var d = 1;
var step = 20;

function setup() {
	createCanvas(700, 700);
	frameRate(20);


}

function draw() {

	background(100, 30);


	if (d > 400 || d < 0) {

		step = step * -1;

	}

	fill(255, 40);
	ellipse(30, 40, d);
	ellipse(250, 300, d);
	ellipse(250, 40, d);
	ellipse(30, 300, d);
	ellipse(140, 170, d);
	ellipse(360, 170, d);
	
	ellipse(470, 40, d);
	ellipse(470, 300, d);
	
	d = d - step;




}
