 let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;


function preload(){
img= loadImage('images/[Monnaie___Angleterre_Guillaume_Ie_[...]_btv1b11354940q_2.png'); ///corriger URL
   
}




function setup() {
    angleMode(DEGREES)
  noCursor();
   createCanvas(windowWidth,windowHeight);
   img.resize(width/1.2,height/1.2)
     aleatoire = random(8000)
    //image(img,0,0)
    background("#e0e0b8");
}




let x=0
let y =0


function  draw(){
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
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r =img.pixels[i]
    let v =img.pixels[i+1]
    let b =img.pixels[i+2]
    let a =img.pixels[i+3] //canal alpha, responsable de la transparence


    if(b>100){
      img.pixels[i+2] = 25


     
    }else {
      img.pixels[i+2] = 14


    }


     if(v>102){ //v>12 et v>102
      img.pixels[i+2] = 255
    }
     else {
      img.pixels[i+1] = 0


    }




   
  }


  img.updatePixels(); // applique les modifs


}
