import React, {useRef} from "react";
import {useSparkline} from "../hooks/useSparkline";

function SparklineSmall(props: { data: number[]; }) {
    const {data} = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useSparkline(canvasRef, data)

    return (
        <div>
            <canvas id={"canvas"} height={100} ref={canvasRef}/>
        </div>
    );
}

export default SparklineSmall;
