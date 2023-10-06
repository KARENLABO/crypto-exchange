import Home from "./Pages";
import { DataProvider } from "./ContextProvider/ContextProvider";

function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;
