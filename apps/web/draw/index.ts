type Shap = {
  type: String;
  x: number;
  y: number;
  width: number;
  height: number;
};

export function initDraw(canvas: HTMLCanvasElement) {
  const shap: Shap[] = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let clicked = false;

  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const height = e.clientY - startY;
    const width = e.clientX - startX;
    shap.push({ type: "rect", x: startX, y: startY, width, height });
    reRenderCanvas(shap, canvas, ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const height = e.clientY - startY;
      const width = e.clientX - startX;
      reRenderCanvas(shap, canvas, ctx);
      ctx.strokeStyle = "white";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function reRenderCanvas(
  shap: Shap[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shap.map((element) => {
    if (element.type === "rect") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(element.x, element.y, element.width, element.height);
    }
  });
}
