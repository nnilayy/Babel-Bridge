import React from 'react';

const ResponseBox = ({ responseText }) => {
  return (
    <div className="response-box">
      <h3>Server Response:</h3>
      <p>{responseText}</p>
    </div>
  );
};

export default ResponseBox;
