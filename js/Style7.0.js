 let img, imgCopy;
let aleatoire;
let x = 0;


function preload() {
  img = loadImage('images/[Monnaies_mérovingiennes]__btv1b104600425_1.png'); 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
noCursor();

  aleatoire = random(8000);


  img.resize(width, 0); // redimension automatique selon largeur
  image(img, 0, 0);
  background("#e0e0b8");
}


function draw() {
  //glitch horizontal
  let largeur = 10;
  let r = 15; //valeur de décalage

  imgCopy = img.get(x + random(-r, r), 0, largeur, img.height); //copie un fragement de l'image originale


  imgCopy.loadPixels(); //change les pixels du canvas
  for (let i = 0; i < imgCopy.pixels.length; i += 4) {
    let redVal = imgCopy.pixels[i];
    let greenVal = imgCopy.pixels[i + 1];
    let blueVal = imgCopy.pixels[i + 2];
    let a = imgCopy.pixels[i + 3]; //canal alpha, responsable de la transparence


    if (blueVal > 100) {
      imgCopy.pixels[i+2] = 25;
    } else {
      imgCopy.pixels[i+1] = 100;
    }


    if (greenVal > 102) {
      imgCopy.pixels[i] = 250;
    } else {
      imgCopy.pixels[i+1] = 5;
    }
  }
  imgCopy.updatePixels();


  image(imgCopy, x, 0); //pour appliquer les modifications


  //pour avancer la position horizontale
  if (x < img.width) {
    x+=largeur;
  } else {
   // pour recommencer la boucle une fois terminé
    x=0;
  }
}
