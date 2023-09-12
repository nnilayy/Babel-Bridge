import React, { useState } from 'react';

const TextContent = ({ onResponseReceived }) => {
  const [NativeLanguage, setNativeLanguage] = useState('hi');
  const [DesiredLanguage, setDesiredLanguage] = useState('en');
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTranslatedText] = useState(''); // State for translated text

  const handleDropdownChange1 = (e) => {
    setNativeLanguage(e.target.value);
  };
  
  const handleDropdownChange2 = (e) => {
    setDesiredLanguage(e.target.value);
  };
  

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (textInput.trim() !== '') {
      fetch('http://localhost:8000/text/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NativeLanguage,
          DesiredLanguage,
          textInput,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Server response:', data);
          setTranslatedText(data); // Update translatedText state
          setTextInput('');
          onResponseReceived(data); // Pass the response text to the parent component
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    } else {
      console.warn('Text input is empty. Please enter text before submitting.');
    }
  };
  

  return (
    <div>
      <h2 className='centerbox-title'>Enter Your Text</h2>
      <div className='centerbox-dropbox'>
        <div className="dropbox-and-title-container">
          <label className='label-style'>Native Language</label>
          <select
            className="dropbox-style"
            value={NativeLanguage}
            onChange={handleDropdownChange1}
          >
            <option value="hi">Hindi</option>
            <option value="pa">Punjabi</option>
            <option value="mr">Marathi</option>
            <option value="ur">Urdu</option>
            <option value="te">Telugu</option>
          </select>
        </div>
        <div className="dropbox-and-title-container">
          <label className='label-style'>Desired Language</label>
          <select className="dropbox-style" value={DesiredLanguage} onChange={handleDropdownChange2}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
      </div>

      <div className='centerbox-content-text'>
        <input
          className="centerbox-content-text-textbox"
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Type here..."
          onKeyDown={handleEnterPress} // Listen for Enter key press
        />
        <button
          type="button"
          className="centerbox-content-record-submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {translatedText && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextContent;
