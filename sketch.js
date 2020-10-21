// serial communication to a microcontroller to adjust brightness
// arduino code can be found here : https://gist.github.com/shfitz/6b6c349f883a44b95fed8546d5525c20

// borrowed in part from https://editor.p5js.org/REAS/sketches/S1TNUPzim

let serial; // variable for the serial object
let bright = 0; // variable to hold the data we're sending
let dark, light; // variables to hold the bgcolor

function setup() {
  createCanvas(512, 512);
  // define the colors
  dark = color(0);
  light = color(255, 204, 0);

  // serial constructor
  serial = new p5.SerialPort();

  // serial port to use - you'll need to change this
  serial.open('/dev/ttyUSB0');

}

function drawGradient(c1, c2) {
  noFill();
  for (let y = 0; y < height; y++) {
    let interp = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, interp);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {
  drawGradient(dark, light);
  stroke(255);
  strokeWeight(3);
  noFill();
  ellipse(mouseX, mouseY, 10, 10);
}

function mouseDragged(){
 
  bright = floor(map(mouseY, 0, 512, 0, 255));
  bright = constrain(bright, 0, 255);
  serial.write(bright);
  console.log(bright);
}
