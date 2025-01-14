import {WebSocketServer, WebSocket}  from "ws";
import { JWT_SECRET } from '@repo/server-common/config';
import jwt, {JwtPayload} from "jsonwebtoken";
import {prismaClient} from "@repo/db/prisma"
const wss = new WebSocketServer({port: 8080});



interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = []

// [{
//   userId,
//   ws,
//   rooms: []
// },{
//   userId,
//   ws,
//   rooms: []
// },]

function checkUserIfo(token: string): string | null {

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

  if(!decoded || !(decoded as JwtPayload).userId) {
    return null;
  }

  return (decoded as JwtPayload).userId;
  } catch (error) {
    return null;
  }

  return null;

}

wss.on("connection", (ws, request) => {

  const url = request.url; //ws://localhost:8080?token=asdkljdkfl342
  if(!url) {
    return;
  }
  
  const queryParams = new URLSearchParams(url.split("?")[1]) //["ws://localhost:8080", "token=asdkljdkfl342"]
  const token = queryParams.get('token') || "";

  const userId = checkUserIfo(token)

  if(userId == null) {
    ws.close();
    return;
  }


  users.push({
    userId,
    rooms: [],
    ws
  })

    ws.on('message', async function message(data) {
      const parsedData = JSON.parse(data as unknown as string); //{type: "join_room", roomId: 1};

      if (parsedData.type === "join_room") {
        const user = users.find(x => x.ws === ws);
        user?.rooms.push(parsedData.roomId);
      }

      if(parsedData.type === "leave_room"){
        const user = users.find(user => user.ws == ws);
        if(!user){
          return;
        }
        user.rooms = user.rooms.filter(user => user == parsedData.room);
      }


      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;
  
        await prismaClient.chat.create({
          data: {
            roomId,
            message,
            userId
          }
        });
  
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({
              type: "chat",
              message: message,
              roomId
            }))
          }
        })
      }

     


    });
  

})