import React, {useEffect, useState} from "react";
import styled from "styled-components";

import {CoinsFetchMarketChart, eColors, errorMessage, IMarketsItem} from "types";
import {getMarketChart} from "utils/api";

import Sparkline from "./Sparkline";

const Container = styled.div`
background: ${eColors.darkGrey};
`;

function ActiveMarket(props: { item: IMarketsItem }) {
    const [data, setData] = useState<number[][]>([]);
    const {item} = props;


    useEffect(() => {
        getMarketChart(item.id).then(
            res => {
                const data: CoinsFetchMarketChart = res.data;
                setData(data.prices);
            }).catch(() => alert(errorMessage));

    }, [item.id]);


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
