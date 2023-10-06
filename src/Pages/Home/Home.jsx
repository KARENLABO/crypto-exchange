import { useContext } from "react";

import { titleImage } from "../../Assets";
import { DataContext } from "../../ContextProvider/ContextProvider";
import Content from "./Components/Content";

import "./styles.scss";

function Home() {
  // Accessing data from the DataContext using useContext
  const { ListCoinsData } = useContext(DataContext);

  return (
    <div>
      {ListCoinsData && (
        <div className="home-page">
          <img src={titleImage} alt="titleImage" />
          <div className="main-content">
            <h2 className="principal-title">
              Choose the currency you're eager to explore and discover its
              exchange rate.
            </h2>
            <Content />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
