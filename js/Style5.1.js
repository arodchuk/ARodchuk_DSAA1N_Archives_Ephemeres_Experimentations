let img,imgBlur;
let listeFiltre =[];
let imageChoisie;
let aleatoire,imgCopy;

function preload(){
img= loadImage('images/[Monnaie___Italie_République_de_[...]_btv1b113114395_1.png'); ///corriger URL
    
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

function draw() {
  //background(255);

  // --- Effet de découpe horizontale avec bruit ---
  let yPos = 0;
  while (yPos < img.height) {
    let h = random(1, 500);
    if (yPos + h > img.height) h = img.height - yPos / 1.2;

    let frag = img.get(0, yPos, width, h);
    image(frag, noise(yPos * 0.1 + frameCount * 0.5) * 89, yPos);
    yPos += h*0.01;
  }

  // --- Traitement des pixels (teinte bleue/verte) ---
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let v = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let a =img.pixels[i+3];

    if (b > 100) {
      img.pixels[i+2] = 2;
    } else {
      img.pixels[i] = 20;
    }

    if (b > 47) {
      img.pixels[i+3] = 80;
    } else {
      img.pixels[i] = 255;
    }
  }
  img.updatePixels();


}