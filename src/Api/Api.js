import axios from "axios";
const API_KEY = process.env.REACT_APP_COIN_API_KEY;

// bring the initial data of the coins to the application
export const bringListCoins = async () => {
  try {
    const coinsData = await axios({
      method: "get",
      url: "https://rest.coinapi.io/v1/assets",
      headers: {
        "X-CoinAPI-Key": API_KEY,
      },
    });

    return coinsData.data;
  } catch (e) {
    console.error(e);
  }
};

// check the currency exchange
export const getExchangeRate = async (crypto, local, setError) => {
  try {
    const coinsRate = await axios({
      method: "get",
      url: `https://rest.coinapi.io/v1/exchangerate/${crypto}/${local}`,
      headers: {
        "X-CoinAPI-Key": API_KEY,
      },
    });
    return coinsRate.data.rate;
  } catch (e) {
    console.error(e.response.data);
    setError(e.response.data.error);
  }
};
