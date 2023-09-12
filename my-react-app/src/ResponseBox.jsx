import React from 'react';

const ResponseBox = ({ responseText }) => {
  return (
    <div className='response-box-container'>
        <div className="response-box">
        <h3>Server Response:</h3>
        <p>{responseText}</p>
        </div>
    </div>
  );
};

export default ResponseBox;
