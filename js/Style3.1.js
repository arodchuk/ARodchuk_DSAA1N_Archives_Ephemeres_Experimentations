 let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;
let cnv; //canvas

let offsetX = 0;
let offsetY = 0;
let speed = 10; // vitesse du déplacement


function preload(){
img= loadImage('images/[Monnaie___Angleterre_Guillaume_Ie_[...]_btv1b11354940q_2.png'); ///corriger URL
   
}




function setup() {
    cnv=createCanvas(windowWidth, windowHeight);
    let newCanvasX = (windowWidth- img.width)/2;
    let newCanvasY = (windowHeight- img.height)/2;
    cnv.position(newCanvasX,newCanvasY);
  noCursor();
  angleMode(DEGREES);

    img.resize(1000,1000);
    aleatoire = random(8000);
    //image(img,0,0)
    background("#e0e0b8");
}




let x=0
let y =0


function  draw(){
translate(offsetX, offsetY);

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


    if(b>100){
      img.pixels[i+2] = 200


     
    }else {
      img.pixels[i+1] = 50


    }


     if(r>102){ //v>12 et v>102
      img.pixels[i] = 179
    }
     else {
      img.pixels[i+3] = 0


    }

  }
  


  img.updatePixels(); // applique les modifs


}

function keyPressed() {
  if (keyCode === LEFT_ARROW)  offsetX -= speed;
  if (keyCode === RIGHT_ARROW) offsetX += speed;
  if (keyCode === UP_ARROW)    offsetY -= speed;
  if (keyCode === DOWN_ARROW)  offsetY += speed;
}
