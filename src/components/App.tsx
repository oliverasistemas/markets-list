import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {IMarketsItem} from "types";
import {getMarkets} from "utils/api";
import useOnScreen from "hooks/useOnScreen";

import Market from "./Market";

const Container = styled.div`
  padding: 10px;
  background: #1e1f1e;
  display: flex;
  justify-content: center;

  h1 {
    text-align: center;
    color: #eeeeee;
  }
`;

const errorMessage = "There was an error fetching markets data, probably you exceeded Coin Gecko's API rate limiting, please try again in a minute";

function App() {
    const [markets, setMarkets] = useState<IMarketsItem[]>([]);
    const [page, setPage] = useState(1);
    const [selectedMarket, setSelectedMarket] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible || page === 1) {
            getMarkets(page)
                .then(x => setMarkets([...markets, ...x.data]))
                .catch(() => alert(errorMessage))
            ;
            setPage(page + 1);
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
                <h1>Markets List</h1>
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
