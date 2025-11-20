 let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;
let cnv; //canvas

let offsetX = 0;
let offsetY = 0;
//pour pouvoir changer la position de l'animation dans le canvas avec les fleches du clavier

let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false;
let speed = 5; // vitesse de déplacement des fleches clavier

//pour pouvoir changer la taille de l'animation dans le canvas

let zoomIn = false;
let zoomOut = false;

let zoomSpeed = 0.005;
let zoom = 1;

function preload(){
img= loadImage('images/[Monnaie___Angleterre_Guillaume_Ie_[...]_btv1b11354940q_2.png'); ///corriger URL
   
}




function setup() {
    cnv=createCanvas(1000, 1000);
    let newCanvasX = (windowWidth- img.width)/2;
    let newCanvasY = (windowHeight- img.height)/2;
    cnv.position(newCanvasX,newCanvasY);
  noCursor();

  angleMode(DEGREES);
    img.resize(1000,1000);
    aleatoire = random(8000);
    //image(img,0,0)
    background("#e0e0b8");

    frameRate(24); //changer les FPS du GIF

}




let x=0
let y =0
let alreadyDrawn = false;

let recording = false;

function  draw(){
  //if (!alreadyDrawn) {
 // background('#7A7265');
  //alreadyDrawn = true;
 // }

  if(recording) {
    background('#7A7265');
    recording = false;
  }

  // Déplacement continu
if (movingLeft)  offsetX -= speed;
if (movingRight) offsetX += speed;
if (movingUp)    offsetY -= speed;
if (movingDown)  offsetY += speed;

// Zoom continu
if (zoomIn)  zoom += zoomSpeed;
if (zoomOut && zoom > 0.1) zoom -= zoomSpeed;

// Appliquer les transformations
translate(offsetX, offsetY);
scale(zoom);
translate(offsetX, offsetY);
scale(zoom); //pour pouvoir changer la taille de l'animation dans le canvas

  largeur =60;
  hauteur =35;


  let yPos=0;
  while (yPos < img.height){
  let h= random(1,3)
  if(yPos+h > img.height)
    h=img.height-yPos/1.2;
  let frag =img.get(0,yPos,width,h)
  image(frag,noise(yPos*0.05+frameCount*0.01)*100,yPos)
  yPos+=h
  }
      img.loadPixels(); // charge les pixels du canvas
        for (let i = 0; i < img.pixels.length; i += 4) { //changer la valeur de i pour bouger les difféents groupes pixels 1.5 et 2 sont intéressants
          let r =img.pixels[i]
          let v =img.pixels[i+1]
          let b =img.pixels[i+2]
          let a =img.pixels[i+3] //canal alpha, responsable de la transparence


          if(r>110){
            img.pixels[i+2] = 20
          
          }else {
            img.pixels[i+1] = 150

          }
          if(r>102){ //v>12 et v>102
            img.pixels[i+2] = 1
          }
          else {
            img.pixels[i+1] = 10
          }

  }
  


  img.updatePixels(); // applique les modifs


}

function mousePressed() {
  dragging = true;
  dragStartX = mouseX - offsetX;
  dragStartY = mouseY - offsetY;
}

function mouseDragged() {
  if (dragging) {
    offsetX = mouseX - dragStartX;
    offsetY = mouseY - dragStartY;
  }
}

function mouseReleased() {
  dragging = false;
}

//pour pouvoir changer la position de l'animation dans le canvas avec les fleches du clavier
function keyPressed() {
  if (keyCode === LEFT_ARROW)  movingLeft = true;
  if (keyCode === RIGHT_ARROW) movingRight = true;
  if (keyCode === UP_ARROW)    movingUp = true;
  if (keyCode === DOWN_ARROW)  movingDown = true;
  //pour pouvoir changer la taille de l'animation dans le canvas
  if (key === '+') zoomIn = true; //appuyer sur maj+ pour activer le +
  if (key === '-') zoomOut = true; //appuyer sur 6 pour activer le -

//pour enregistrer des gif
    if (key === 's') {
    saveGif('mySketch', 5);
    recording = true;
  }
}

function keyReleased() {
  movingLeft = movingRight = movingUp = movingDown = false;

  zoomIn = false;
  zoomOut = false;
}
