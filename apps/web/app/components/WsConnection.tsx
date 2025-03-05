"use client"
import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@repo/server-common/config";


export default function WsConnection({roomId}: {roomId: string}) {
    // const roomId = (await params).roomId;
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NGQwMDRmYy0wYzIzLTQyNjktOGJlMC0xMDI5ZmRjODI3OTgiLCJpYXQiOjE3Mzc2MDY4OTd9.LelsN02FZtgK8naVBduXksEySWJpferx-xrTRvKub4w`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    }, [])

    if(!socket) {
        return <div> connecting to server</div>
    }
    
    return <Canvas roomId={roomId} socket={socket} />
}