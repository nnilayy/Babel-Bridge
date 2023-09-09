import React, { useState } from 'react';
import './App.css';
import RecordContent from './RecordContent';
import AudioVideoContent from './AudioFileContent';
import TextContent from './TextContent';

const CenterBox = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Record':
        return <RecordContent />;
      case 'Audio/Video File':
        return <AudioVideoContent />;
      case 'Text':
        return <TextContent />;
      default:
        return <div>Select an option to display content</div>;
    }
  };

  return (
    <div className='container'>
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
