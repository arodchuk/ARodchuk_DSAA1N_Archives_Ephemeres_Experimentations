let img;
let imgLight, imgDark;


// === Sliders ===
let lightHueSlider, lightThresholdSlider;
let darkHueSlider, darkThresholdSlider;


// === Paramètres visuels des sliders ===
let sliderWidth = 300;


function preload() {
  img = loadImage('images/[Monnaie___Angleterre_Sceattas_700-1100]__btv1b11309077v_2.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  noCursor();



  img.resize(width / 1.2, height / 1.2);


  imgLight = createImage(img.width, img.height);
  imgDark = createImage(img.width, img.height);


  // === Interface ===
  createP("Lumières").style("font-weight", "bold");


  createSpan("Couleur : ");
  lightHueSlider = createHueSlider(0, 360, 320);


  createSpan(" Valeur : ");
  lightThresholdSlider = createSlider(0, 1, 0.5, 0.01).style("width", sliderWidth + "px");


  createP("Ombres").style("font-weight", "bold");


  createSpan("Couleur : ");
  darkHueSlider = createHueSlider(0, 360, 160);


  createSpan(" Valeur : ");
  darkThresholdSlider = createSlider(0, 1, 0.5, 0.01).style("width", sliderWidth + "px");

  background("#e0e0b8");
}


function draw() {
  //background(255);


  let lightHue = lightHueSlider.value();
  let darkHue = darkHueSlider.value();
  let lightThreshold = lightThresholdSlider.value();
  let darkThreshold = darkThresholdSlider.value();


  img.loadPixels();
  imgLight.loadPixels();
  imgDark.loadPixels();


  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let a = img.pixels[i + 3];


    let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;


    // Image claire
    if (brightness > lightThreshold) {
      let c = color(lightHue, 80, 100);
      imgLight.pixels[i] = red(c);
      imgLight.pixels[i + 1] = green(c);
      imgLight.pixels[i + 2] = blue(c);
      imgLight.pixels[i + 3] = a;
    } else {
      imgLight.pixels[i + 3] = 0;
    }


    // Image sombre
    if (brightness < darkThreshold) {
      let c2 = color(darkHue, 80, 80);
      imgDark.pixels[i] = red(c2);
      imgDark.pixels[i + 1] = green(c2);
      imgDark.pixels[i + 2] = blue(c2);
      imgDark.pixels[i + 3] = a;
    } else {
      imgDark.pixels[i + 3] = 0;
    }
  }


  imgLight.updatePixels();
  imgDark.updatePixels();


  let offsetXLight = map(mouseX, 0, width, -40, 40);
  let offsetYLight = map(mouseY, 0, height, -25, 25);


  let offsetXDark = map(mouseX, 0, width, 80, -40);
  let offsetYDark = map(mouseY, 0, height, 205, -25);


  tint(255, 200);
  image(imgDark, offsetXDark, offsetYDark);
  tint(255, 200);
  image(imgLight, offsetXLight, offsetYLight);


  noTint();
  fill(0, 20);
  rect(0, 0, width, height);
}


// === Fonction utilitaire : crée un slider avec fond de spectre coloré ===
function createHueSlider(min, max, val) {
  let canvas = createGraphics(sliderWidth, 15);
  canvas.colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < canvas.width; i++) {
    canvas.stroke(i / canvas.width * 360, 100, 100);
    canvas.line(i, 0, i, canvas.height);
  }


  let sliderContainer = createDiv();
  sliderContainer.style("position", "relative");
  sliderContainer.style("display", "inline-block");
  sliderContainer.style("margin-right", "10px");


  // fond coloré (spectre)
  let bgImg = createImg(canvas.elt.toDataURL(), "");
  bgImg.style("width", sliderWidth + "px");
  bgImg.style("height", "15px");
  bgImg.style("position", "absolute");
  bgImg.style("top", "0");
  bgImg.style("left", "0");
  bgImg.style("pointer-events", "none"); // ne bloque pas le slider


  let slider = createSlider(min, max, val, 1);
  slider.style("width", sliderWidth + "px");
  slider.parent(sliderContainer);
  bgImg.parent(sliderContainer);


  return slider;
}
