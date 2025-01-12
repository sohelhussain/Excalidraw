import {WebSocketServer}  from "ws";

const wss = new WebSocketServer({port: 8080});

wss.on("connection", (ws, request) => {

  const url = request.url; //ws://localhost:8080?token=asdkljdkfl342
  //["ws://localhost:8080", "token=asdkljdkfl342"]
  if(!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1])
  const token = queryParams.get('token') || "";
  

    ws.on('message', function message(data) {
      console.log("pong");
    });
  

})