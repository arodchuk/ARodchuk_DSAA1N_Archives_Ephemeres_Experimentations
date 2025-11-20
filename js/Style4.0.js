let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;

function preload(){
img= loadImage('images/[Monnaie___Angleterre_Sceattas_700-1100]__btv1b11309077v_1.png'); ///corriger URL
    
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

  for (let i = 0; i < img.width; i+=largeur) {
  let frag =img.get(i,0,largeur,height)
  image(frag,i,noise(i*10+frameCount*0.01)*100)
} 


img.filter(THRESHOLD)
let yPos=0;
while (yPos < img.height){
let h= random(1,2)
if(yPos+h > img.height) 
h=img.height-yPos/1.2;
let frag =img.get(0,yPos,width,h)
image(frag,noise(yPos*0.02+frameCount*0.1)*100,yPos)
yPos+=h
}


}