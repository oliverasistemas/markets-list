import {errorMessage, IMarketsItem, IMarketsMap} from "../types";
import {useEffect, useState} from "react";
import {getMarkets} from "../utils/api";

export const useMarkets = (isVisible: any): [boolean, IMarketsItem[]] => {
    const [markets, setMarkets] = useState<IMarketsMap>({});
    const [fetching, setFetching] = useState(false)
    const [page, setPage] = useState(1);

    useEffect(() => {
        setFetching(true)
        if (isVisible || page === 1) {
            getMarkets(page)
                .then(x => {
                    setMarkets(prevState => ({...prevState, [page]: x.data}));
                    setPage(prevState => prevState + 1);
                })
                .catch(() => alert(errorMessage))
                .finally(() => setFetching(false))
            ;
        }
    }, [isVisible, page, setMarkets]);

    const marketArray = [];

    for (let marketsKey in markets) {
        marketArray.push(...markets[marketsKey])
    }

    return [fetching, marketArray]
}
