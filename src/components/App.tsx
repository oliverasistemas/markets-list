import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {eColors, errorMessage, IMarketsItem} from "types";
import {getMarkets} from "utils/api";
import useOnScreen from "hooks/useOnScreen";

import Market from "./Market";

const Container = styled.div`
  padding: 10px;
  background: ${eColors.black};
  display: flex;
  justify-content: center;

  h1 {
    text-align: center;
    color: ${eColors.white};
  }
`;


function App() {
    const [markets, setMarkets] = useState<IMarketsItem[]>([]);
    const [page, setPage] = useState(1);
    const [selectedMarket, setSelectedMarket] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible || page === 1) {
            getMarkets(page)
                .then(x => {
                    setMarkets(prevState => [...prevState, ...x.data]);
                    setPage(page + 1);
                })
                .catch(() => alert(errorMessage))
            ;
        }
    }, [isVisible]);

    const onMarketClick = (marketId: string) => {
        if (selectedMarket === marketId) {
            setSelectedMarket("");
        } else {
            setSelectedMarket(marketId);
        }
    };

    return (
        <Container>
            <section>
                <h1>Coingecko Markets List</h1>
                {markets.map(market => <Market
                    onMarketSelected={onMarketClick}
                    selectedMarket={selectedMarket}
                    key={market.id}
                    item={market}
                />
                )}
                <div ref={ref} />
            </section>
        </Container>
    );
}

export default App;
