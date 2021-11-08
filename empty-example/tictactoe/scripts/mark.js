class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
	}
}

class Mark{
	constructor(x,y,r){
		this.half = r/2;
		this.pos = new Vector2(x-this.half,y-this.half);
		this.r = r;
		this.show();
	}
}
class X extends Mark{
	show(){
		line(this.pos.x, this.pos.y, this.pos.x+this.r, this.pos.y+this.r);
		line(this.pos.x+this.r, this.pos.y, this.pos.x, this.pos.y+this.r);
	}
}
class O extends Mark{
	show(){
		ellipse(this.pos.x+this.half, this.pos.y+this.half, this.r, this.r);
	}
}