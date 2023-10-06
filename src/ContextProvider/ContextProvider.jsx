import { useEffect, useState } from "react";
import { createContext } from "react";

import { bringListCoins } from "../Api/Api";
import categorizeObjects from "./helper";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ListCoinsData, setListCoinsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await bringListCoins();

        setListCoinsData(categorizeObjects(data));
      } catch (error) {
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DataContext.Provider value={{ ListCoinsData }}>
      {children}
    </DataContext.Provider>
  );
};
