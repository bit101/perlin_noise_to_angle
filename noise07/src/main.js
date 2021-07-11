const { Random, Color, Num, Noise, Context, Anim } = bljs;
const { Toggle, PlayButton, HSlider, Panel, Canvas } = mc;

/////////////////////////////
// MODEL
/////////////////////////////

const width = 400;
const height = 400;

/////////////////////////////
// CONTROLS
/////////////////////////////
const panel = new Panel(document.body, 0, 0, 210 + width, height + 40);
const canvas = new Canvas(panel, 190, 20, width, height);
const context = canvas.context;
Context.extendContext(context);

const slider = new HSlider(panel, 20, 40, "Offset Angle", 0, 0, 360);
const scaleSlider = new HSlider(panel, 20, 80, "Scale", 0.004, 0.001, 0.01)
  .setDecimals(3);
const toggle = new Toggle(panel, 20, 120, "Show Vectors", true);

/////////////////////////////
// VIEW
/////////////////////////////

const particles = [];
for (let i = 0; i < 500; i++) {
  particles.push({
    x: Random.float(0, width),
    y: Random.float(0, height),
    vx: 0,
    vy: 0,
  });
}
let z = 0;

const anim = new Anim(render);

new PlayButton(panel, 20, 160, false)
  .bind(anim, "running");

function render() {
  context.clearWhite();
  const offset = slider.value / 180 * Math.PI;
  const scale = scaleSlider.value;
  if (toggle.toggled) {
    const res = 10;
    context.lineWidth = 0.2;
    for (let x = 0; x < width; x += res) {
      for (let y = 0; y < height; y += res) {
        const n = Noise.perlin(x * scale, y * scale, z);
        const angle = Num.map(n, -1, 1, 0, Math.PI * 8) + offset;
        context.save();
        context.translate(x + res / 2, y + res / 2);
        context.rotate(angle);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(res, 0);
        context.stroke();
        context.restore();
      }
    }
  }
  context.points(particles, 1);
  particles.forEach(p => {
    const n = Noise.perlin(p.x * scale, p.y * scale, z);
    const angle = Num.map(n, -1, 1, 0, Math.PI * 8) + offset;
    p.vx = Math.cos(angle) * 2;
    p.vy = Math.sin(angle) * 2;
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) {
      p.x = width;
      p.y = Random.float(height);
    }
    if (p.x > width) {
      p.x = 0;
      p.y = Random.float(height);
    }
    if (p.y < 0) {
      p.y = height;
      p.x = Random.float(width);
    }
    if (p.y > height) {
      p.y = 0;
      p.x = Random.float(width);
    }
  });
  z += 0.01;
}
