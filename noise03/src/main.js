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

// const anim = new Anim(render);
// anim.run();

render();

function render() {
  const scale = 0.01;
  const res = 1;
  context.beginPath();
  for (let x = 0; x < width * 2; x += res) {
    const n = Noise.perlin1(x * scale);
    const val = Num.map(n, -1, 1, 0, height);
    context.lineTo(x / 2, val);
  }
  context.stroke();

  context.beginPath();
  context.moveTo(0, height * 0.25);
  context.lineTo(width, height * 0.25);
  context.moveTo(0, height / 2);
  context.lineTo(width, height / 2);
  context.moveTo(0, height * 0.75);
  context.lineTo(width, height * 0.75);
  context.stroke();

  context.fillText("1.0", 10, 10);
  context.fillText("0.5", 10, height * 0.25 - 10);
  context.fillText("0.0", 10, height * 0.5 - 10);
  context.fillText("-0.5", 10, height * 0.75 - 10);
  context.fillText("-1.0", 10, height - 5);
}
