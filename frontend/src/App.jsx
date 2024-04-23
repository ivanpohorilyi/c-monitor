import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const App = () => {

  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)

  const getCurrencies = () => {
    axios.get('http://localhost:8000/cryptocurrencies').then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        getItem('Coins list', 'g1', null, 
        currenciesResponse.data.map(c => {
          return {label: c.name, key: c.id}
        }),
        'group'
        )
      ]
      setCurrencies(menuItems)
    })
  }

  const getCurrency = () => {
    axios.get(`http://localhost:8000/cryptocurrencies/${currencyId}`).then(r => {
      setCurrencyData(r.data)
    })
  }

  useEffect(() => {
    getCurrencies()
  }, [])

  useEffect(() => {
    getCurrency()
  }, [currencyId]) 

  const onClick = (e) => {
    setCurrencyId(e.key)
  };
  return (
    <div className='flex'>
      <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={currencies}
      className='h-screen overflow-scroll'
    />
    <div className='mx-auto my-auto'>
    <CryptocurrencyCard currency={currencyData}/>
    </div>
    </div>
  );
};
export default App;