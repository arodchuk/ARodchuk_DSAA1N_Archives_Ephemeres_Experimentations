let img;
let imgLight, imgDark;
let thresholdLevel = 0.5; // seuil (0 à 1)

function preload() {
  img = loadImage('images/[Monnaie_Demi-stavraton_Manuel_II_Paléologue_[...]Manuel_II_btv1b10455286s_1.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(width / 1.2, height / 1.2);
  noCursor();
 background("#e0e0b8");

  // Crée deux images vides (même dimensions que l'image originale)
  imgLight = createImage(img.width, img.height);
  imgDark = createImage(img.width, img.height);
  
}

function draw() {
  //background(255);

  img.loadPixels();
  imgLight.loadPixels();
  imgDark.loadPixels();
  noCursor();

  // === Séparation threshold colorée ===
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let a = img.pixels[i + 3];

    // luminosité perçue
    let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (brightness > thresholdLevel) {
      // --- Partie claire (light) colorée rose/magenta ---
      imgLight.pixels[i] = 255;
      imgLight.pixels[i + 1] = 100;
      imgLight.pixels[i + 2] = 200;
      imgLight.pixels[i + 3] = a;

      // Partie sombre transparente
      imgDark.pixels[i + 3] = 0;
    } else {
      // --- Partie sombre (dark) colorée vert/bleu ---
      imgDark.pixels[i] = 80;
      imgDark.pixels[i + 1] = 200;
      imgDark.pixels[i + 2] = 160;
      imgDark.pixels[i + 3] = a;

      // Partie claire transparente
      imgLight.pixels[i + 3] = 0;
    }
  }

  imgLight.updatePixels();
  imgDark.updatePixels();

  // === Animation en fonction de la souris ===
  let offsetXLight = map(mouseX, 0, width, -40, 40);
  let offsetYLight = map(mouseY, 0, height, -25, 25);

  let offsetXDark = map(mouseX, 0, width, 80, -40);
  let offsetYDark = map(mouseY, 0, height, 205, -25);

  // === Affichage superposé ===
  // couche sombre légèrement décalée
  tint(178, 36, 17, 255);
  image(imgDark, offsetXDark, offsetYDark);

  // couche claire (rose)
  tint(255, 150, 220, 150);
  image(imgLight, offsetXLight, offsetYLight);

  noTint();

  // --- (optionnel) ajoute un fondu du fond ---
  fill(0, 20);
  rect(0, 0, width, height);
}
