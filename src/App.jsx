import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";

const clientQuery = new QueryClient();

function App() {
  return (
    <div className="App">
      <h1>Infinite SWAPI</h1>
      <QueryClientProvider client={clientQuery}>
      <InfinitePeople />
      <InfiniteSpecies />
      </QueryClientProvider>
    </div>
  );
}

export default App;
