import { useEffect, useState } from "react";
import { createContext } from "react";

import { bringListCoins } from "../Api/Api";
import { Loader } from "../Components";
import categorizeObjects from "./helper";
import Error from "../Components/Error/Error";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ListCoinsData, setListCoinsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await bringListCoins();

        setListCoinsData(categorizeObjects(data));
      } catch (error) {
        setError(error)
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <DataContext.Provider value={{ ListCoinsData }}>
      {children}
    </DataContext.Provider>
  );
};
