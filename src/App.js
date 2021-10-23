// import React from "react";
// import JokeList from "./JokeList";

// function App() {
//   return (
//     <div className="App">
//       <JokeList />
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';
import "./App.css";
import JokeList from './JokeList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList/>
      </div>
    )
  }
}

export default App;
