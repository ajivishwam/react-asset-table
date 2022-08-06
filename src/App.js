import './App.css';
import {useState,useEffect} from 'react';
import AssetTable from './Components/Table/Table';

function App() {
  const [cryptoData,setCryptoData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCryptoData();
      console.log('Table Updated');
    },5000)
    return () => clearInterval(interval);
  },[cryptoData])

  const getCryptoData = async () => {
    // Free public api to use for demo
    const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR');
    const apiResponse = await data.json();
    const sortedData = apiResponse.sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    setCryptoData(sortedData)
  }

  return (
    <div className="App">
        <AssetTable data={cryptoData} onReorder={setCryptoData}/>
    </div>
  );
}

export default App;
