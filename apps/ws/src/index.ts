import {WebSocketServer}  from "ws";
import { JWT_SECRET } from '@repo/server-common/config';
import jwt, {JwtPayload} from "jsonwebtoken";
const wss = new WebSocketServer({port: 8080});

wss.on("connection", (ws, request) => {

  const url = request.url; //ws://localhost:8080?token=asdkljdkfl342
  if(!url) {
    return;
  }
  
  const queryParams = new URLSearchParams(url.split("?")[1]) //["ws://localhost:8080", "token=asdkljdkfl342"]
  const token = queryParams.get('token') || "";
  const decoded = jwt.verify(token, JWT_SECRET);

  if(!decoded || !(decoded as JwtPayload).userId){  // userId string me nhi he vo jwtPayload me hogi, to hamne kha he ki decoded JwtPayload hi he
    ws.close();
    return;
  }

    ws.on('message', function message(data) {
      console.log("pong");
    });
  

})