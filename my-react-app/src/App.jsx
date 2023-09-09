// App.js

import React from 'react';
import './App.css';
import Navbar from './Navbar.jsx';
import CenterBox from './CenterBox.jsx';
// Import the Navbar component

function App() {
  return (
    <div className="App">
        <Navbar /> 
        <CenterBox />
    </div>
  );
}

export default App;
