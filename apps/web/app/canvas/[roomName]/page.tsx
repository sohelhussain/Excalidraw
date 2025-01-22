"use client"

import { useEffect, useRef } from "react"
import { initDraw } from "../../../draw";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
           
            initDraw(canvas);

        }
    }, [canvasRef])

    return <div className="w-full h-screen">
        <canvas ref={canvasRef} ></canvas>
    </div>
}