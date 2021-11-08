class BoxCollider{
  constructor(x,y,r){
    this.r = r;
    this.x = x;
    this.y = y;
    //getting the bottom right point
    this.x2 = x+this.r;
    this.y2 = y+this.r;
  }
  show(){
    noStroke();
    fill(255,0,0,100);
    rect(this.x, this.y, this.r, this.r);
    stroke(255);
  }
  collided(box){
    if(this.x <= box.x2 && this.y <= box.y2 && this.x2 >= box.x && this.y2 >= box.y){
      return true;
    }
    return false;
  }
}
class RectCollider{
  constructor(x,y,x2,y2){
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }
  show(){
    noStroke();
    fill(0,255,0,100);
    rect(this.x, this.y, this.x2, this.y2);
    stroke(255);
  }
  collided(box){
    if(this.x <= box.x2 && this.y <= box.y2 && this.x2 >= box.x && this.y2 >= box.y){
      return true;
    }
    return false;
  }
}

class Explosion{
  particleCount = 5;
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = 20;
    this.bullets = [];
    this.setup();
  }
  setup(){
    for(var i=0; i<this.particleCount; i++){
      this.velocity = new Vector2(random(-1,1),random(-1,1));
      this.bullets.push(new Bullet(this.x, this.y,this.velocity.x,this.velocity.y));
    }
  }
  explode(){
    for(b of this.bullets){
      b.radius = 2;
      b.show();
      b.update();
    }
  }
}
