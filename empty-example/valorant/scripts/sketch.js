var ch;
var enemy;
let bg;
let chimg;
var explosions = [];
let enemies = [];


function setup(){
  let cont = document.getElementById("container");
  let canv = createCanvas(500,300);
  canv.parent(cont);
  background(0);
  ch = new Character();
  enemy = new Character();
  enemy.pos = new Vector2(width, height/2);
  enemy.setVelocity(-1,0);
  enemies.push(enemy);
  frameRate(30);
}

let bullets = [];
function draw(){
	background(0);
	stroke(255);
	strokeWeight(5);
	line(0,0,0,height);

	var field = new RectCollider(0,0,5,height);
	field.show();


	if(random(0,1) < 0.05){
		var enemy = new Character();
	  	enemy.pos = new Vector2(width, random(0,height));
	  	enemy.setVelocity(-1,0);
	  	enemies.unshift(enemy);
	}

	ch.show();
	ch.update();
	for(enemy of enemies){
		enemy.show();
		enemy.update();
	}

		

	for(b of bullets){
		b.show();
		b.addBoxCollider();
		b.update();
		var i=0;
		for(enemy of enemies){
			if(enemy.collider.collided(b.collider)){
				bullets.pop(b);
				enemy.takehit(b.damage);
				explosions.unshift(new Explosion(b.pos.x, b.pos.y));
			}
			if(field.collided(enemy.collider)){
				enemies.pop(enemy);
				ch.health -= 20;
			}
			if(enemy.health <= 0){
				enemies.splice(i,1);
			}
			if(ch.health <= 0){
				noLoop();
			}
			i++;
		}
	}

	for(exp of explosions){
		exp.explode();
	}

	strokeWeight(5);
	var d = dist(50,50,mouseX,mouseY);
	d = constrain(d,50,100);


	var radius = 5;

	var controllerx = 100;
	var controllery = height/2+height/4;

	for(var i=0;i<=50; i++){
		var a = map(i,0,50,-PI,PI);
		var nx = sin(a) * 40;
		var ny = cos(a) * 40;
		point(nx+controllerx,ny+controllery);
	}
	if(bullets.length > 50){
		bullets.pop();
	}
	if(explosions.length > 2){
		explosions.pop();
	}
	strokeWeight(20);
	

	//find the angle
	d = dist(0,0,mouseX-controllerx,mouseY-controllery);
	var angle = acos((mouseX-controllerx)/d);
	
	var y = sin(angle) * radius;
	var x = cos(angle) * radius;
	if(mouseY-controllery < 0){
		angle = -acos((mouseX-controllerx)/d);
		y = sin(angle) * radius;
		x = cos(angle) * radius;
	}
	point(x+controllerx, y+controllery);



	bullets.unshift(ch.fire(random(0,10),random(-10,6)));

	fill(255);
	noStroke(0);
	text(mouseX-(width/2),50,50);
	text(mouseY-(height/2),100,50);
	text(angle,150,50);
	
}
function mousePressed(){
	var speed = 50;
	var x = map(mouseX,0,width,-speed,speed);
	var y = map(mouseY,0,height,-speed,speed);
	bullets.unshift(ch.fire(x,y));
}
function keyPressed(){
	if(key == ' '){
		//ch.jump();
	}
}

