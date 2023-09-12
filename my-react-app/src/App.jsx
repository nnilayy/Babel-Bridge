// App.js

import React from 'react';
import './App.css';
import Navbar from './Navbar.jsx';
import CenterBox from './CenterBox.jsx';
// Import the Navbar component

function App() {
  return (
    
    <div className="App">
      <div className='content'>
        <Navbar /> 
        <CenterBox />
    </div>
      </div>
  );
}

export default App;
