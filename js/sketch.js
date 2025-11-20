let img;
let hueSlider;

function preload() {
  img = loadImage('images/[Monnaies_mérovingiennes]__btv1b104600425_2.png');
}

function setup() {
  createCanvas(windowWidth/1.2, windowHeight/1.2);
  colorMode(HSB, 360, 100, 100, 255);
  angleMode(DEGREES);
  noStroke();
  noCursor();

  img.resize(width, 0);

  createP("Couleur");
  hueSlider = createHueSlider(0, 360, 200); // Slider de teinte
background("#e0e0b8");
}

function draw() {
  //background(0, 0, 100); // fond blanc

  let h = hueSlider.value(); // teinte du slider
  let bandHeight = 42; // hauteur d’une bande
  let time = frameCount * 0.5;

  for (let y = 0; y < img.height; y += bandHeight) {
    // mouvement horizontal basé sur le bruit
    let offsetX = noise(y * 0.02 + time) * 200 - 100; // déplacement gauche/droite

    // extrait une bande horizontale
    let band = img.get(0, y, img.width, bandHeight);

    // === traitement de couleur (sobre et doux) ===
    band.loadPixels();
    for (let i = 0; i < band.pixels.length; i += 4) {
      let r = band.pixels[i];
      let g = band.pixels[i+1];
      let b = band.pixels[i+2];
      let br = (r + g + b) / 1.5;

      let sat = 25; // saturation faible pour couleurs sobres
      let bright = map(br, 0, 255, 4, 100);

      let c;
      if (br > 125) {
        c = color(h, sat, bright);
      } else {
        c = color((h + 180) % 360, sat, bright * 0.58);
      }

      band.pixels[i] = red(c);
      band.pixels[i + 1] = green(c);
      band.pixels[i + 2] = blue(c);
    }
    band.updatePixels();

    // affiche la bande déplacée horizontalement
    image(band, offsetX, y);
  }
}

// === Slider avec fond de spectre coloré ===
function createHueSlider(min, max, val) {
  let sliderWidth = 300;
  let canvas = createGraphics(sliderWidth, 10);
  canvas.colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < canvas.width; i++) {
    canvas.stroke(i / canvas.width * 360, 100, 100);
    canvas.line(i, 0, i, canvas.height);
  }

  let container = createDiv();
  container.style("position", "relative");
  container.style("display", "inline-block");

  let bgImg = createImg(canvas.elt.toDataURL(), "");
  bgImg.style("width", sliderWidth + "px");
  bgImg.style("height", "10px");
  bgImg.style("position", "absolute");
  bgImg.style("top", "0");
  bgImg.style("left", "0");
  bgImg.style("pointer-events", "none");

  let slider = createSlider(min, max, val, 1);
  slider.style("width", sliderWidth + "px");
  slider.parent(container);
  bgImg.parent(container);

  return slider;
}
