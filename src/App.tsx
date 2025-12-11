import Hero from "./components/Hero/Hero";
import Houses from "./components/Houses/Houses";
import Scoreboard from "./components/Scoreboard/Scoreboard";

import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      {isLoading ? (
        <Loader onDone={() => setIsLoading(false)} />
      ) : (
        <>
          <Hero />
          <Houses />
          <Scoreboard />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;
