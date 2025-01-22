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

    return <div className="w-full h-screen relative">
        <canvas ref={canvasRef}></canvas>
        <div className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none">
            <nav className="w-full h-[5%] text-white flex justify-center items-center">
                selector
            </nav>
            <div className="w-full h-[95%] pointer-events-none flex">
                <div className="w-[10%] h-full text-white">
                    adjuture
                </div>
                <div className="w-full h-full text-white pointer-events-none">
                    message
                </div>
            </div>
        </div>
    </div>
}