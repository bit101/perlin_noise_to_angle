const { Color, Num, Noise, Context, Anim } = bljs;
const { Panel, Canvas } = mc;

/////////////////////////////
// MODEL
/////////////////////////////

const width = 400;
const height = 400;
const model = {
};

/////////////////////////////
// CONTROLS
/////////////////////////////
const panel = new Panel(document.body, 0, 0, 210 + width, height + 40);
const canvas = new Canvas(panel, 160, 20, width, height);
const context = canvas.context;
Context.extendContext(context);

// other controls here

/////////////////////////////
// VIEW
/////////////////////////////

let z = 10;
// const anim = new Anim(render);
// anim.run();

render();

function render() {
  context.clearWhite();
  const scale = 0.006;
  const res = 20;
  z += 0.01;
  for (let x = 0; x < width; x += res) {
    for (let y = 0; y < height; y += res) {
      const nx = Noise.perlin(x * scale, y * scale, 0);
      const ny = Noise.perlin(x * scale, y * scale, z);
      const angle = Math.atan2(ny, nx);
      // console.log(nx, ny, angle);
      context.save();
      context.translate(x + res / 2, y + res / 2);
      context.rotate(angle);
      context.fillStyle = Color.hsv(Num.map(angle, -Math.PI, Math.PI, 180, 540), 1, 1);
      context.fillCircle(0, 0, res / 2);
      // context.strokeCircle(0, 0, res / 2);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(res / 2, 0);
      context.stroke();
      context.restore();
    }
  }
}
