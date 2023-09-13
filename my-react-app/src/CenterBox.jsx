import React, { useState } from 'react';
import './App.css';
import RecordContent from './RecordContent';
import AudioFileContent from './AudioFileContent';
import TextContent from './TextContent';
import ResponseBox from './ResponseBox'; // Import the ResponseBox component

const CenterBox = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [responseText, setResponseText] = useState(null); // Track the response text

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    setResponseText(null); // Reset the response text when switching options
  };

  const handleResponseReceived = (text) => {
    setResponseText(text); // Update the response text
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Record':
        return (
          <>
            {responseText ? (
              <ResponseBox responseText={responseText} /> // Render the ResponseBox component when there's a response
            ) : (
              <RecordContent onResponseReceived={handleResponseReceived} /> // Pass the callback function
            )}
          </>
        );
      case 'Audio/Video File':
        return (
          <>
            {responseText ? (
              <ResponseBox responseText={responseText} /> // Render the ResponseBox component when there's a response
            ) : (
              <AudioFileContent onResponseReceived={handleResponseReceived} /> // Pass the callback function
            )}
          </>
        );
      case 'Text':
        return (
          <>
            {responseText ? (
              <ResponseBox responseText={responseText} /> // Render the ResponseBox component when there's a response
            ) : (
              <TextContent onResponseReceived={handleResponseReceived} /> // Pass the callback function
            )}
          </>
        );
      default:
        return <div>Select an option to display content</div>;
    }
  };

  return (
    <div className='container'>
      <div className='gradient-heading'>
        <div className='gradient-text'>
          <h2 className='gradient-heading-text'>Babel Bridge</h2>
          <p className='gradient-explanation-text'>
          <i>Unlocking India's Multilingual Conversations, One Word at a Time</i>
          </p>
        </div>
      </div>
      <div className='centerbox'>
        <div className='top-layer'>
          <button className='button' onClick={() => handleButtonClick('Record')}>
            Record
          </button>
          <button className='button' onClick={() => handleButtonClick('Audio/Video File')}>
            Audio File
          </button>
          <button className='button' onClick={() => handleButtonClick('Text')}>
            Text
          </button>
        </div>
        <div className='bottom-layer'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default CenterBox;
