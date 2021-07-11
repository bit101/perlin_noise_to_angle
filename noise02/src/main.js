const { Num, Noise, Context } = bljs;
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
  const vals = [];
  // higher scale gives smoother bell curve
  const scale = 0.3;
  const multiplier = 1;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const n = Noise.perlin2(x * scale, y * scale);

      // usual
      let val = Math.round(Num.map(n, -1, 1, 0, width * multiplier));

      // alternate mapping
      // let val = Math.round(Num.map(n, -0.5, 0.5, 0, width));

      // allow for wrapping
      val %= width;

      if (!vals[val]) {
        vals[val] = 1;
      } else {
        vals[val]++;
      }
    }
  }
  for (let x = 0; x < width; x++) {
    // 0.2 scales graph to fit in box. might need to change for different values above.
    const val = vals[x] * 0.2;
    context.fillRect(x, height - val, 1, val);
  }
}
