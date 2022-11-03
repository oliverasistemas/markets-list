import React from "react";
import styled from "styled-components";

import {eColors, MarketItem} from "types";
import {currencyFormatter} from "utils/format";
import Small from "./Small";

const Container = styled.div`
  border-left: 2px solid ${eColors.darkGrey};
  height: 200px;
  position: absolute;
`;

const Infobox = styled.div`
  background: rgb(73, 73, 73);
  color: ${eColors.white};
  padding: 10px;
  position: absolute;
`;

function Tooltip(props: { datum: MarketItem; xPos: number; }) {
    const {datum, xPos} = props;

    return (
        <Container
            id={"tooltip"}
            style={{left: xPos}}
        >
            <Infobox id={"infobox"}>
                <div>{currencyFormatter.format(datum.value)}</div>
                <Small label={datum.date} color={eColors.grey} />
            </Infobox>

        </Container>

    );
}

export default Tooltip;
