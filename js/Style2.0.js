let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;

function preload(){
img= loadImage('images/[Monnaie___Angleterre_700-1100]__btv1b11309171j_1.png'); ///corriger URL
    
}
          


function setup() {
    angleMode(DEGREES)
  noCursor();
   createCanvas(windowWidth,windowHeight);
	 img.resize(width/1.2,height/1.2)
     aleatoire = random(800)
    //image(img,0,0)
      background("#e0e0b8");
}


let x=0
let y =0

function  draw(){
  largeur =15;
  hauteur =25;

  for (let i = 0; i < img.width; i+=largeur) {
  let frag =img.get(i,0,largeur,height)
  image(frag,i,noise(i*10+frameCount*0.01)*100)
}

for (let a = 0; a < img.height; a+=hauteur) {
 if(a%2==0){
    let frag =img.get(0,a,width,hauteur)
  image(frag,noise(a*10+frameCount*0.01)*100,a)
 }

 img.loadPixels(); // charge les pixels du canvas
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r =img.pixels[i] //pixels rouges
    let v =img.pixels[i+1] //pixels verts
    let b =img.pixels[i+2] //pixels bleus
    let a =img.pixels[i+3] //canal alpha, responsable de la transparence

    if(v>255){
      img.pixels[i+3] = 10

    }

    else {
      img.pixels[i+2] = 136

    }

    
  }

  img.updatePixels(); // applique les modifs


}

}