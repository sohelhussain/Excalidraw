import axios from "axios";
import { HTTP_URL } from "@repo/server-common/config";

type Shape = {
  type: string;
  x: number;
  y: number;
  roomId?: string;
  userId?: string;
  width: number;
  height: number;
  endX?: number,
  endY?: number,
  radius?: number,
  image?: string,
  text?: string,
  strokeColor?: string,
  fillColor?: string,
  round?: string,
};

type WebSocketMessage = {
  type: string,
  roomId: string
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const shapes: Shape[] = await getingTheShap("9803574b-61f9-4f7f-a9d7-713347b22415");
  console.log(shapes);
  console.log("object");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }


  socket.onmessage = (event) => {
   console.log(event); 
    const {type, startX, startY, width, height} = JSON.parse(event.data);
    if(type == "rect") {
         shapes.push({
          roomId: "9803574b-61f9-4f7f-a9d7-713347b22415",
            type,
            x: startX,
            y: startY,
            width,
            height
         })
         // if i creating a shape and some one tring push in shape then my screen is rerender again 
         reRenderCanvas(shapes, canvas, ctx); // whenever shap array change we want a rerender the canvas becuse shape array contain new shapek
    }


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
    const shape: Shape = { type: "rect", x: startX, y: startY, width, height, roomId: "9803574b-61f9-4f7f-a9d7-713347b22415" }
    shapes.push(shape);
    socket.send(JSON.stringify(shape));
    reRenderCanvas(shapes, canvas, ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const height = e.clientY - startY;
      const width = e.clientX - startX;
      reRenderCanvas(shapes, canvas, ctx);
      ctx.strokeStyle = "white";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function reRenderCanvas(
  shap: Shape[],
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


async function getingTheShap(roomid: string) {
    const res = await axios.get(`${HTTP_URL}/shapes/${roomid}`)
    const shapes = res.data.shapes; 

    if (!shapes) {
      // Handle the case where shapes is undefined (e.g., return an empty array)
      return [];
  }
    
  const shape = shapes.map((shape: {shape: string}) => {
    try {
      const shapeData = JSON.parse(shape.shape)
      return shapeData
    } catch (error) {
      console.log(error);
      return null;
    }
  }).filter((shape: string) => shape !== null);
  
  console.log(`after map ${shape}`);
  return shape;
}