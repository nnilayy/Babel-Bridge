import React, { useState, useRef } from 'react';
import ResponseBox from './ResponseBox'; // Import the ResponseBox component

const AudioFileContent = ({ onResponseReceived }) => {
  const [NativeLanguage, setNativeLanguage] = useState('hi');
  const [DesiredLanguage, setDesiredLanguage] = useState('en');
  const [audio, setAudio] = useState(null);
  const [serverResponse, setServerResponse] = useState(null); // New state for server response
  const fileInputRef = useRef(null);

  const handleDropdownChange1 = (e) => {
    setNativeLanguage(e.target.value);
  };

  const handleDropdownChange2 = (e) => {
    setDesiredLanguage(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
    }
  };

  const handleUpload = () => {
    if (audio) {
      const formData = new FormData();
      formData.append('NativeLanguage', NativeLanguage);
      formData.append('DesiredLanguage', DesiredLanguage);
      formData.append('audio', audio);

      fetch('http://localhost:8000/audio/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Set the server response in the state
          setServerResponse(data);
          // Call the callback function to notify the parent component
          onResponseReceived(data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    } else {
      console.warn('No file selected. Please choose an audio file before submitting.');
    }
  };

  return (
    <div>
      <h2 className='centerbox-title'>Drag and Drop Your Audio File</h2>
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
      <div className='centerbox-content-drag-n-drop'>
        <div
          className={`drag-and-drop ${audio ? 'file-selected' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          {audio ? (
            <div>
              <p>Selected file:</p>
              <p>{audio.name}</p>
            </div>
          ) : (
            <p>Click or drag and drop a file here</p>
          )}
        </div>
        <input
          type="file"
          accept="audio/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <div>
          <button className="betabutton" onClick={handleUpload}>Submit</button>
          <button className="betabutton" onClick={() => setAudio(null)}>Reset</button>
        </div>
      </div>

      {/* Display the server response */}
      {serverResponse && (
        <ResponseBox responseText={serverResponse} />
      )}
    </div>
  );
};

export default AudioFileContent;
