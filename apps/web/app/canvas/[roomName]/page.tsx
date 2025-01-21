"use client"

import { useEffect, useRef } from "react"


export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
             const canvas = canvasRef.current;
             const ctx = canvas.getContext("2d");

             if(!ctx){
                return;
             }

             ctx.strokeRect(0,25,100,100)

        }
    },[canvasRef])

    return <div className="w-full h-screen bg-zinc-600">
        <canvas ref={canvasRef}></canvas>
    </div>
}