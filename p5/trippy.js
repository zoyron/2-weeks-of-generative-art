function setup() { 
  createCanvas(500, 500);
} 

function draw() { 
	
	var sc = 128 + sin(frameCount/50) * 128;
	var fc = 128 + cos(frameCount/30) * 128;
	
  fill(fc,30);
	rect(0, 0, width, height);
	
	var x = width/2 + cos(frameCount/30) * 120;
	var y = height/2 + sin(frameCount/30) * 120;

	stroke(sc, 45);
	for (var i = 0; i < width; i += 10) {
		line(i, 0, x, y);
	}
	for (var i = 0; i < width; i += 10) {
		line(i, height, x, y);		
	}
	for (var i = 0; i < height; i += 10) {
		line(0, i, x, y);		
	}
	for (var i = 0; i <= height; i += 10) {
		line(width, i, x, y);		
	}
}
