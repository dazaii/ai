class Bullet{
	radius = 5;
	damage = 100;
	constructor(x,y,targetx, targety){
		this.pos = new Vector2(x,y);
		this.velocity = new Vector2(targetx, targety);
		this.gravity = 0;
	}
	addBoxCollider(){
		this.collider = new BoxCollider(this.pos.x-(this.radius/2), this.pos.y-(this.radius/2), this.radius);
		this.collider.show();
	}
	show(){
		strokeWeight(this.radius);
		stroke(255);
		point(this.pos.x, this.pos.y);
		// /this.addBoxCollider();
	}
	update(){
		this.pos.add(this.velocity);
		this.velocity.y += this.gravity;
	}
}

class Character{
	x = 100;
	y = height/2;
	health = 100;
	level = 1;
	gainPerLevel = 0.1; //10%
	power = 10;
	speed = 1;
	damage = this.power + (this.power * (this.level * this.gainPerLevel));

	velocity = new Vector2(0,0);
	gravity = new Vector2(0,0);

	radius = 16;

	constructor(){
		this.pos = new Vector2(this.x,this.y);
		this.vy = new Vector2(0,0);
	}
	addBoxCollider(){
		this.collider = new BoxCollider(this.pos.x-(this.radius/2), this.pos.y-(this.radius/2), this.radius);
		this.collider.show();
	}
	teleport(x,y){
		this.pos = new Vector2(x,y);
	}
	setVelocity(x,y){
		this.velocity = new Vector2(x,y);
	}
	show(){
		strokeWeight(this.radius);
		stroke(255);
		point(this.pos.x, this.pos.y);
		//image(chimg,this.pos.x-25, this.pos.y,50,50);
	}
	update(){
		this.pos.add(this.velocity);
		this.pos.add(this.vy);
		this.vy.add(this.gravity);
		this.pos.y = constrain(this.pos.y, 0, height-8);
		this.addBoxCollider();
		this.updateHealth();
	}
	jump(){
		if(this.pos.y == height-8){
			this.vy.y = -10;
		}
	}
	fire(x,y){
		var bullet = new Bullet(this.pos.x, this.pos.y,x,y);
		return bullet;
	}
	takehit(damage){
		this.health -= damage;
	}
	updateHealth(){
		noStroke();
		fill(255);
		textSize(10);
		text(this.health.toFixed(0),this.pos.x+16,this.pos.y-14);
		var green = map(this.health, 0,100,0,255);
		var red = map(this.health, 0,100,255,0);
		var healthbar = map(this.health,0,100,0,24);
		fill(255,50);
		stroke(255,100);
		strokeWeight(1);
		rect(this.pos.x-10,this.pos.y-20,24,5);
		fill(red,green,0);
		rect(this.pos.x-10,this.pos.y-20,healthbar,5);
		this.health = constrain(this.health,0,100);
	}
}