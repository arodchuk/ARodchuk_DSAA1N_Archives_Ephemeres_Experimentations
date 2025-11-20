let images = [];
let particles = [];

function preload() {
  // Charger plusieurs images
  images[0] = loadImage("images/Animation_Landing/1.png");
  images[1] = loadImage("images/Animation_Landing/2.png");
  images[2] = loadImage("images/Animation_Landing/3.png");
  images[3] = loadImage("images/Animation_Landing/4.png");
  images[4] = loadImage("images/Animation_Landing/5.png");
  images[5] = loadImage("images/Animation_Landing/6.png");
}

function setup() {
  createCanvas(1000,1000);
  angleMode(DEGREES);
  noCursor();
  frameRate(24); //changer les FPS du GIF
}

function draw() {
  background("#e0e0b8");

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].offScreen()) {
      particles.splice(i, 1);
    }
  }
}

function mouseDragged() {
  // Crée un nouvel objet image à la position de la souris
  particles.push(new ImageParticle(mouseX, mouseY));
}

// Classe pour les images flottantes
class ImageParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(70, 700); // taille aléatoire
    this.speedX = random(-20, 20);
    this.speedY = random(-10, 10);
    this.img = random(images); // choisir une image aléatoire
    this.rotation = random(360);
    this.rotationSpeed = random(-1.2, 1.2);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size);
    pop();
  }

  offScreen() {
    return (this.y + this.size/2 < 0);
  }



}

function keyPressed() {
  //pour pouvoir changer la taille de l'animation dans le canvas
  if (key === '+') zoomIn = true; //appuyer sur maj+ pour activer le +
  if (key === '-') zoomOut = true; //appuyer sur 6 pour activer le -

//pour enregistrer des gif
    if (key === 's') {
    saveGif('mySketch', 10);
    recording = true;
  }
}