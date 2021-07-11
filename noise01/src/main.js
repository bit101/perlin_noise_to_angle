const { Color, Num, Noise, Context } = bljs;
const { Panel, Canvas } = mc;

/////////////////////////////
// MODEL
/////////////////////////////

const width = 400;
const height = 400;

/////////////////////////////
// CONTROLS
/////////////////////////////
const panel = new Panel(document.body, 0, 0, 210 + width, height + 40);
const canvas = new Canvas(panel, 160, 20, width, height);
const context = canvas.context;
Context.extendContext(context);

/////////////////////////////
// VIEW
/////////////////////////////

render();

function render() {
  // initial
  // const scale = 0.01;

  // multiplier 4x
  const scale = 0.004;
  const multiplier = 4;

  const res = 20;
  for (let x = 0; x < width; x += res) {
    for (let y = 0; y < height; y += res) {
      const n = Noise.perlin2(x * scale, y * scale);

      // usual mapping
      const angle = Num.map(n, -1, 1, 0, Math.PI * 2 * multiplier);

      // change mapping:
      // const angle = Num.map(n, -0.5, 0.5, 0, Math.PI * 2 * multiplier);
      context.save();
      context.translate(x + res / 2, y + res / 2);
      context.rotate(angle);

      // no color
      // context.strokeCircle(0, 0, res / 2);

      // color map
      context.fillStyle = Color.hsv(angle * 180 / Math.PI, 1, 1);
      context.fillCircle(0, 0, res / 2);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(res / 2, 0);
      context.stroke();
      context.restore();
    }
  }
}
