// TextContent.js
import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop'; // Import the DragAndDrop component
import './App.css';
const AudioFileContent = () => {
  const [selectedOption1, setSelectedOption1] = useState('Option X');
  const [selectedOption2, setSelectedOption2] = useState('Option Y');

  const handleDropdownChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleDropdownChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };

  return (
    <div>
      <h2 className='centerbox-title'>Drag and Drop Your Audio File</h2>
      <div className='centerbox-dropbox'>
        <div className="dropbox-and-title-container">
          <label className='label-style'>Native Language</label>
          <select className="dropbox-style" value={selectedOption1} onChange={handleDropdownChange1}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>

        <div className="dropbox-and-title-container">
          <label className='label-style'>Desired Language</label>
          <select className="dropbox-style" value={selectedOption2} onChange={handleDropdownChange2}>
            <option value="Option A">Option A</option>
            <option value="Option B">Option B</option>
            <option value="Option C">Option C</option>
          </select>
        </div>
      </div>
      <div className='centerbox-content-drag-n-drop'>
        <DragAndDrop /> {/* Include the DragAndDrop component here */}
      </div>
    </div>
  );
};

export default AudioFileContent;
