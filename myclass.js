class XYZ{
        constructor(x,y,z){
          this.x=x;
          this.y=y;
          this.z=z;
        }
      }
      class Cube{
        points = [];
        constructor(x,y,z,scale){
          this.x = x*scale;
          this.y = y*scale;
          this.z = z*scale;
          this.scl = scale;
          this.show();
          this.connect();
          this.mesh();
        }
        show(){
          stroke(255);
          strokeWeight(2);
          this.points.push(new XYZ(this.x*this.scl,this.y*this.scl,this.z*this.scl));
          this.points.push(new XYZ((this.x+this.scl)*this.scl,this.y*this.scl,this.z*this.scl));
          this.points.push(new XYZ(this.x*this.scl,(this.y+this.scl)*this.scl,this.z*this.scl));
          this.points.push(new XYZ((this.x+this.scl)*this.scl,(this.y+this.scl)*this.scl,this.z*this.scl));
          
          this.points.push(new XYZ(this.x*this.scl,this.y*this.scl,(this.z+this.scl)*this.scl));
          this.points.push(new XYZ((this.x+this.scl)*this.scl,this.y*this.scl,(this.z+this.scl)*this.scl));
          this.points.push(new XYZ(this.x*this.scl,(this.y+this.scl)*this.scl,(this.z+this.scl)*this.scl));
          this.points.push(new XYZ((this.x+this.scl)*this.scl,(this.y+this.scl)*this.scl,(this.z+this.scl)*this.scl));

          beginShape();
          for(var i=0; i<8; i++){
            if(i%2==0){
              vertex(this.points[i].x,this.points[i].y,this.points[i].z);
            }else{
              vertex(this.points[i].x,this.points[i].y,this.points[i].z);
            }
          }
          endShape();
        }
        connect(){
          for(var i=0;i<4;i++){
            line(this.points[i].x, this.points[i].y, this.points[i].z, this.points[i+4].x, this.points[i+4].y, this.points[i+4].z);
          }
          for(var i=0;i<8;i+=2){
            line(this.points[i].x, this.points[i].y, this.points[i].z,this.points[i+1].x, this.points[i+1].y, this.points[i+1].z);
          }
          for(var i=0;i<8;i+=4){
            line(this.points[i].x, this.points[i].y, this.points[i].z,this.points[i+2].x, this.points[i+2].y, this.points[i+2].z);
            line(this.points[i+1].x, this.points[i+1].y, this.points[i+1].z,this.points[i+3].x, this.points[i+3].y, this.points[i+3].z);
          }
          
        }
        mesh(){
          //triangles
          line(this.points[1].x, this.points[1].y, this.points[1].z,this.points[2].x, this.points[2].y, this.points[2].z);
          line(this.points[3].x, this.points[3].y, this.points[3].z,this.points[5].x, this.points[5].y, this.points[5].z);
          line(this.points[7].x, this.points[7].y, this.points[7].z,this.points[4].x, this.points[4].y, this.points[4].z);
          line(this.points[0].x, this.points[0].y, this.points[0].z,this.points[6].x, this.points[6].y, this.points[6].z);
          line(this.points[3].x, this.points[3].y, this.points[3].z,this.points[6].x, this.points[6].y, this.points[6].z);
          line(this.points[0].x, this.points[0].y, this.points[0].z,this.points[5].x, this.points[5].y, this.points[5].z);
        }
      }