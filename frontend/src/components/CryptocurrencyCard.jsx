import {Card} from "antd";
import React from "react";


function CryptocurrencyCard(props) {
    const { currency} = props;
    return (
      <div>
        <Card
          title={
            <div className="flex items-center gap-3">
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}/>
              <span>{currency.name}</span>
            </div>
          }
          style={{
            width: 300,
          }}
        >
          <p>Цена сейчас: {}</p>
          <p>Содержимое карточки</p>
          <p>Содержимое карточки</p>
        </Card>
      </div>
    );
  }
  
  export default CryptocurrencyCard;
  