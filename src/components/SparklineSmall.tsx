import React, {useEffect, useRef} from "react";
import {eColors} from "../types";

function SparklineSmall(props: { data: number[]; }) {
    const {data} = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            const dataMin = Math.min(...data);
            const dataMax = Math.max(...data, Math.abs(dataMin));
            const baseY = canvas.height;
            const ratioX = canvas.width / (data.length - 1);
            const ratioY = canvas.height / (dataMax - dataMin);

            ctx.strokeStyle = data[0] > data[data.length - 1] ? eColors.danger : eColors.success;
            ctx.lineWidth = 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let x = 0, y = 0;
            ctx.beginPath();
            for (let i = 0; i < data.length; i++) {
                x = i * ratioX;
                y = baseY - (data[i] - dataMin) * ratioY;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
        }


    }, [data]);

    return (
        <div>
            <canvas id={"canvas"} height={100} ref={canvasRef}/>
        </div>
    );
}

export default SparklineSmall;