let img, imgCopy;
let aleatoire;
let x = 0;
let hueSlider;


function preload() {
  img = loadImage('images/[Monnaies_mérovingiennes]__btv1b10456800d_2.png'); 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255); // mode couleur HSB
  angleMode(DEGREES);
noCursor();

  aleatoire = random(8000);


  img.resize(width, 0);
  //image(img, 0, 0);


  // === Slider de teinte ===
  createP("Couleur");
  hueSlider = createHueSlider(0, 360, 200); // slider avec spectre coloré
background("#e0e0b8");
}


function draw() {
  let largeur = 1;
  let r = 4; // décalage horizontal
  let h = hueSlider.value(); // récupère la teinte actuelle du slider


  // copie d’un fragment vertical de l’image originale
  imgCopy = img.get(x + random(-r, r), 0, largeur, img.height);


  imgCopy.loadPixels();
  for (let i = 0; i < imgCopy.pixels.length; i += 4) {
    let redVal = imgCopy.pixels[i];
    let greenVal = imgCopy.pixels[i + 1];
    let blueVal = imgCopy.pixels[i + 2];


    // Calcul de la luminosité moyenne
    let brightness = (redVal + greenVal + blueVal) / 3;


    // Teinte dynamique en fonction du slider
    let c;
    if (brightness > 70) {
      c = color(h, 80, 85); // zones claires → couleur vive
    } else {
      c = color((h + 180) % 360, 10, 250); // zones sombres → couleur complémentaire
    }


    imgCopy.pixels[i] = red(c);
    imgCopy.pixels[i + 1] = green(c);
    imgCopy.pixels[i + 2] = blue(c);
  }
  imgCopy.updatePixels();


  image(imgCopy, x, 0);


  // défilement horizontal
  if (x < img.width) {
    x += largeur;
  } else {
    x = 0;
  }
}


//Fonction pour créer un slider avec fond de spectre
function createHueSlider(min, max, val) {
  let sliderWidth = 300;
  let canvas = createGraphics(sliderWidth, 5);
  canvas.colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < canvas.width; i++) {
    canvas.stroke(i / canvas.width * 360, 100, 100);
    canvas.line(i, 0, i, canvas.height);
  }


  let container = createDiv();
  container.style("position", "relative");
  container.style("display", "inline-block");


  // fond coloré
  let bgImg = createImg(canvas.elt.toDataURL(), "");
  bgImg.style("width", sliderWidth + "px");
  bgImg.style("height", "15px");
  bgImg.style("position", "absolute");
  bgImg.style("top", "0");
  bgImg.style("left", "0");
  bgImg.style("pointer-events", "none");


  let slider = createSlider(min, max, val, 5);
  slider.style("width", sliderWidth + "px");
  slider.parent(container);
  bgImg.parent(container);


  return slider;
}




