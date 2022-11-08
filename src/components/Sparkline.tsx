import React, {MouseEvent, useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {eColors, MarketItem} from "types";

import Tooltip from "./Tooltip";

function getItem(data: MarketItem[], xPos: number, ratioX: number) {
    return data[Math.round(xPos / ratioX)];
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

function Sparkline(props: { data: MarketItem[]; }) {
    const [tooltipPos, setTooltipPos] = useState<number>(0);
    const [tooltipData, setTooltipData] = useState<MarketItem>();
    const {data} = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            const numbers = data.map(x => x.value);
            const dataMin = Math.min(...numbers);
            const dataMax = Math.max(...numbers, Math.abs(dataMin));
            const baseY = canvas.height;
            const ratioX = canvas.width / (data.length - 1);
            const ratioY = canvas.height / (dataMax - dataMin);

            ctx.strokeStyle = numbers[0] > numbers[numbers.length - 1] ? eColors.danger : eColors.success;
            ctx.lineWidth = 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let x = 0, y = 0;
            ctx.beginPath();
            for (let i = 0; i < data.length; i++) {
                x = i * ratioX;
                y = baseY - (numbers[i] - dataMin) * ratioY;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
        }

    };

    function onMouseOver(e: MouseEvent) {
        const message = e.nativeEvent;
        const id = (e.target as Element).id;
        const newXPos = id === "tooltip" || id === "infobox" ? tooltipPos + message.offsetX : message.offsetX;

        setTooltipData(getItem(data, newXPos, 800 / (data.length - 1)));
        setTooltipPos(newXPos);
    }

    return (
        <Container onMouseMoveCapture={onMouseOver} style={{position: "relative"}}>
            {tooltipData && <Tooltip datum={tooltipData} xPos={tooltipPos}/>}
            <canvas
                id={"canvas"}
                width={800}
                height={200}
                ref={canvasRef}
            />
        </Container>

    );
}

export default Sparkline;
