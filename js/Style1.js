let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;

function preload(){
img= loadImage('images/[Monnaie___Angleterre_700-1100]__btv1b11309171j_2.png'); ///corriger URL
    
}

// La division de l'image en bandes

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
  largeur =15;
  hauteur =25;

//bandes verticales
  for (let i = 0; i < img.width; i+=largeur) {
  let frag =img.get(i,0,largeur,height)
  image(frag,i,noise(i*10+frameCount*0.01)*100)
}

//bandes horizontales
for (let a = 0; a < img.height; a+=hauteur) {
 if(a%2==0){
    let frag =img.get(0,a,width,hauteur)
  image(frag,noise(a*10+frameCount*0.01)*100,a)
 }
}

}