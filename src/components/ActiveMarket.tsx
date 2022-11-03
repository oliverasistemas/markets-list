import React, {useEffect, useState} from "react";
import styled from "styled-components";

import {CoinsFetchMarketChart, IMarketsItem} from "types";
import {getMarketChart} from "utils/api";

import Sparkline from "./Sparkline";

const Container = styled.div`
background: #4c4c60;
`;

const errorMessage = "There was an error fetching markets data, probably you exceeded Coin Gecko's API rate limiting, please try again in a minute";

function ActiveMarket(props: { item: IMarketsItem }) {
    const [data, setData] = useState<number[][]>([]);

    useEffect(() => {
        getMarketChart(item.id).then(
            res => {
                const data: CoinsFetchMarketChart = res.data;
                setData(data.prices);
            }).catch(() => alert(errorMessage));

    }, []);

    const {item} = props;

    const formattedData = data.map(x => {
        return {
            date: (new Date(x[0]).toLocaleDateString()),
            value: x[1]
        };
    });

    return <Container>
        {data.length > 0 && <Sparkline data={formattedData}/>}
    </Container>;
}

export default ActiveMarket;
