import React, {MouseEvent, useRef, useState} from "react";
import styled from "styled-components";

import {MarketItem} from "types";

import Tooltip from "./Tooltip";
import {useSparkline} from "../hooks/useSparkline";

function getItem(data: MarketItem[], xPos: number, ratioX: number) {
    return data[Math.round(xPos / ratioX)];
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

function Sparkline(props: { data: MarketItem[]; width: number}) {
    const [tooltipPos, setTooltipPos] = useState<number>(0);
    const [tooltipData, setTooltipData] = useState<MarketItem>();
    const {data, width} = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useSparkline(canvasRef, data.map(x => x.value))

    const onMouseOver = (e: MouseEvent) => {
        const message = e.nativeEvent;
        const id = (e.target as Element).id;
        const newXPos = id === "tooltip" || id === "infobox" ? tooltipPos + message.offsetX : message.offsetX;

        setTooltipData(getItem(data, newXPos, width / (data.length - 1)));
        setTooltipPos(newXPos);
    }

    return (
        <Container onMouseMoveCapture={onMouseOver} style={{position: "relative"}}>
            {tooltipData && <Tooltip datum={tooltipData} xPos={tooltipPos}/>}
            <canvas
                id={"canvas"}
                width={width}
                height={200}
                ref={canvasRef}
            />
        </Container>

    );
}

export default Sparkline;
