let m;
var slider,volumeslider;
var time, fixed;
var amp;
function preload(){
	m = loadSound("../mylib/music/yoasobi.mp3");
}
function setup() {
  createCanvas(500,500);
  background(0);
  amp = new p5.Amplitude();
  m.loop();
}

function draw() {
  background(0);
  var diam = amp.getLevel() * 500;
  ellipse(width/2, height/2, width, diam);
  fill(255);
}