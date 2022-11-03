import React from "react";
import styled from "styled-components";

import {eColors, IMarketsItem} from "types";
import {currencyFormatter, numberFormatter, percentageFormatter} from "utils/format";

import SparklineSmall from "./SparklineSmall";
import ActiveMarket from "./ActiveMarket";
import Small from "./Small";
import Strong from "./Strong";

const Container = styled.div`
  margin-bottom: 5px;

  section.markets {
    align-items: center;
    background: #2d2d38;
    color: #d0cece;
    cursor: pointer;
    display: flex;
    padding: 5px;
    margin-bottom: 2px;

    &.active {
      background: #4c4c60;
    }
    
  }

  small {
    font-size: 12px;
  }

  .sparkline {
    padding: 0 20px;
  }

  .stats {
    text-align: right;
    min-width: 200px;

  }

  .price {
    text-align: right;
    min-width: 100px;
  }

  .token {
    text-align: left;
    min-width: 120px;
  }
`;

function Market(props: { item: IMarketsItem, selectedMarket: string, onMarketSelected: (marketId: string) => void }) {
    const {item, selectedMarket, onMarketSelected} = props;
    const {image, name, symbol, current_price, price_change_24h} = item;

    const isActive = selectedMarket === item.id;
    return (
        <Container onClick={() => onMarketSelected(item.id)}>
            <section className={`markets ${isActive ? "active" : ""}` }>
                <div className="pl-3">
                    <img alt={name} width={50} src={image}/>
                </div>
                <div className={"pl-3 token"}>
                    <Strong label={`${symbol}+USD`} />
                    <small>{name}</small>
                </div>
                <div className={"sparkline"}>
                    <SparklineSmall data={item.sparkline_in_7d.price}/>
                </div>

                <div className={"pl-3 stats"}>
                    <div>{numberFormatter.format(item.total_volume / current_price)} <small>{item.symbol.toUpperCase()}</small>
                    </div>
                    <Small
                        label="24h volume"
                        color={eColors.grey}
                    />
                </div>
                <div className={"px-3 price"}>
                    <Strong label={currencyFormatter.format(current_price)} />
                    <Small
                        label={percentageFormatter.format(price_change_24h / current_price * 100)+"%"}
                        color={item.price_change_24h > 0 ? eColors.success : eColors.danger}
                    />
                </div>
            </section>
            {isActive && <ActiveMarket item={item} />}
        </Container>
    );

}

export default Market;
