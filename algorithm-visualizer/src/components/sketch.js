function sketch(p5) {
  let flock;
  const separation = 15;
  const alignment = 50;
  const cohesion = 50;
  const numberOfBoids = 200;

  /**
   * A majority of this code is adopted from the example provided by p5 via link:
   * https://p5js.org/examples/simulate-flocking.html
   */

  p5.setup = () => {
    var cnv = p5.createCanvas(700, 400);
    var x = (window.innerWidth - p5.width) / 2;
    // var y = (window.innerHeight - p5.height) / 2;
    cnv.position(x, cnv.y);

    flock = new Flock();
    for (let i = 0; i < numberOfBoids; i++) {
      flock.addBoid(new Boid(p5.width / 2, p5.height / 2));
    }
  }

  p5.draw = () => {
    p5.background(51);
    let target = p5.createVector(p5.mouseX, p5.mouseY);
    if (p5.mouseIsPressed === true) {
      flock.run(target, true);
      p5.circle(target.x, target.y, 32)
    } else {
      flock.run(target, false);
    }
  }

  // The Nature of Code
  // Daniel Shiffman
  // http://natureofcode.com

  function Flock() {
    this.boids = []; 
  }

  Flock.prototype.run = function(toEvade, pressed) {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids, toEvade, pressed); 
    }
  }

  Flock.prototype.addBoid = function(boid) {
    this.boids.push(boid);
  }

  function Boid(x, y) {
    this.acceleration = p5.createVector(0, 0);
    this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.position = p5.createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    
    this.maxforce = 0.05; 
  }

  Boid.prototype.run = function(boids, toEvade, pressed) {
    this.flock(boids, toEvade, pressed);
    this.update();
    this.borders();
    this.render();
  }

  Boid.prototype.applyForce = function(force) {
    this.acceleration.add(force);
  }

  Boid.prototype.flock = function(boids, toEvade, pressed) {
    let sep = this.separate(boids);   // Separation
    let ali = this.align(boids);      // Alignment
    let coh = this.cohesion(boids);   // Cohesion
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    if (pressed) {
      let flee = this.flee(toEvade)
      flee.mult(1.0);
      this.applyForce(flee);
    }
  }

  Boid.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  Boid.prototype.seek = function(target) {
    let desired = p5.constructor.Vector.sub(target,this.position); 
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.constructor.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce); 
    return steer;
  }

  Boid.prototype.flee = function(target) {
    let desired = p5.constructor.Vector.sub(target,this.position); 
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.constructor.Vector.sub(desired,this.velocity);
    steer.mult(-1);
    steer.limit(0.2); 
    return steer;
  }

  Boid.prototype.render = function() {
    let theta = this.velocity.heading() + p5.radians(90);
    p5.fill(127);
    p5.stroke(200);
    p5.push();
    p5.translate(this.position.x, this.position.y);
    p5.rotate(theta);
    p5.beginShape();
    p5.vertex(0, -this.r * 2);
    p5.vertex(-this.r, this.r * 2);
    p5.vertex(this.r, this.r * 2);
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  const padding = 0; 
  Boid.prototype.borders = function() {
    if ((this.position.x - padding) < -this.r)  {
      this.position.x = p5.width + this.r
    }
    if ((this.position.y - padding) < -this.r) {
      this.position.y = p5.height + this.r;
    }
    if ((this.position.x + padding) > p5.width + this.r) {
      this.position.x = -this.r;
    }
    if ((this.position.y + padding) > p5.height + this.r) {
      this.position.y = -this.r;
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  Boid.prototype.separate = function(boids) {
    let desiredseparation = separation;
    let steer = p5.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.constructor.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < desiredseparation)) {
        let diff = p5.constructor.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);        
        steer.add(diff);
        count++;            
      }
    }
    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  Boid.prototype.align = function(boids) {
    let neighbordist = alignment;
    let sum = p5.createVector(0,0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.constructor.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.constructor.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return p5.createVector(0, 0);
    }
  }

  // Cohesion
  // For the center location of all nearby boids, calculate steering vector towards that location
  Boid.prototype.cohesion = function(boids) {
    let neighbordist = cohesion;
    let sum = p5.createVector(0, 0); 
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.constructor.Vector.dist(this.position,boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); 
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);  
    } else {
      return p5.createVector(0, 0);
    }
  }



}

export default sketch