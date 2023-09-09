import React, { useState } from 'react';

const RecordContent = () => {
  const [selectedOption1, setSelectedOption1] = useState('Option 1');
  const [selectedOption2, setSelectedOption2] = useState('Option A');

  const handleDropdownChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleDropdownChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };

  const [textInput, setTextInput] = useState('');
  
  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
    // You can access the text input value with textInput
  };
  return (
    <div>
        <h2 className='centerbox-title'>Record Your Voice</h2>
        

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
        
        
        <div className='centerbox-content-record'>
        <input className="centerbox-content-record-textbox" type="text" value={textInput} onChange={handleTextInputChange}  placeholder="Type here..."/>
        <button className="centerbox-content-record-submit" onClick={handleSubmit} >Submit</button>
      </div>

    </div>
  );
};

export default RecordContent;
