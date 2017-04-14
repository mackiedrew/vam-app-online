import React from "react";
import "./App.styl";

// Components
import Tracks from "../../components/Tracks/Tracks";

const App = () => (
  <div className="app">
    <header>
      <h1>VAM Editor</h1>
    </header>
    <main>
      <Tracks />
    </main>
    <footer>
      <a href="http://valence.audio/">
        Developed for <strong>Valence Audio</strong>
      </a>
    </footer>
  </div>
);

export default App;
