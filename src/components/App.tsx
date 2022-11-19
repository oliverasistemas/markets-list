import React, {useRef, useState} from "react";
import styled from "styled-components";

import {eColors, IMarketsItem} from "types";
import useOnScreen from "hooks/useOnScreen";
import {useMarkets} from "hooks/UseMarkets";

import Market from "./Market";

const Container = styled.div`
  background: ${eColors.black};
  display: flex;
  justify-content: center;

  h1 {
    text-align: center;
    color: ${eColors.white};
  }
`;

function App() {
    const [selectedMarket, setSelectedMarket] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    const [fetching, markets] = useMarkets(isVisible)

    const onMarketClick = (marketId: string) => {
        if (selectedMarket === marketId) {
            setSelectedMarket("");
        } else {
            setSelectedMarket(marketId);
        }
    };

    return (
        <Container className={"p-2"}>
            <section>
                <h1>Coingecko Markets List</h1>
                {markets.map((item: IMarketsItem) => <Market
                        onMarketSelected={onMarketClick}
                        selectedMarket={selectedMarket}
                        key={item.id}
                        item={item}
                    />)}
                {<div ref={ref}/>}
                {fetching && <div>fetching markets...</div>}
            </section>
        </Container>
    );
}

export default App;
