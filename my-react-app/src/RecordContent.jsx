import React, { useState } from 'react';
import ResponseBox from './ResponseBox'; // Import the response box component

function RecordContent({ onResponseReceived }) { // Accept the onResponseReceived prop
  const [audioStream, setAudioStream] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [NativeLanguage, setNativeLanguage] = useState('hi');
  const [DesiredLanguage, setDesiredLanguage] = useState('fr');
  const [audio, setAudio] = useState(null); // Store the recorded audio data
  const [serverResponse, setServerResponse] = useState(''); // Store the server response

  const handleDropdownChange1 = (event) => {
    setNativeLanguage(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setDesiredLanguage(event.target.value);
  };

  const toggleRecording = () => {
    if (isRecording) {
      // If currently recording, stop recording
      stopRecording();
    } else {
      // If not currently recording, start recording
      startRecording();
    }
  };

  const startRecording = () => {
    // Reset audioUrl before starting a new recording
    setAudioUrl('');

    const audioIN = { audio: true };

    navigator.mediaDevices
      .getUserMedia(audioIN)
      .then(function (mediaStreamObj) {
        setAudioStream(mediaStreamObj);

        let audio = document.querySelector('audio');

        if ('srcObject' in audio) {
          audio.srcObject = mediaStreamObj;
        } else {
          audio.src = window.URL.createObjectURL(mediaStreamObj);
        }

        audio.muted = true; // Mute the audio during recording

        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let dataArray = [];

        mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        };

        mediaRecorder.onstop = function (ev) {
          let audioData = new Blob(dataArray, { type: 'audio/wav' });
          dataArray = [];
          let audioSrc = window.URL.createObjectURL(audioData);
          setAudioUrl(audioSrc);
          setAudio(audioData); // Store the recorded audio data
        };

        mediaRecorder.start();

        setIsRecording(true);
      })
      .catch(function (err) {
        console.log(err.name, err.message);
      });
  };

  const stopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    // Reset audioUrl and recording state
    setAudioUrl('');
    setIsRecording(false);
    setAudio(null); // Clear the recorded audio data
  };

  const uploadAudioToServer = () => {
    if (audio) {
      // Create a FormData and append the audio file and dropdown values
      const formData = new FormData();
      formData.append('NativeLanguage', NativeLanguage);
      formData.append('DesiredLanguage', DesiredLanguage);
      formData.append('audio', audio, 'recorded.wav'); // Ensure 'audio' is the field name expected by the server

      // Make a POST request to the server endpoint (update URL as needed)
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
          console.log('Server response:', data);
          setServerResponse(data); // Set the server response in the state
          onResponseReceived(data); // Call the callback function with the server response
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    } else {
      console.warn('No recorded audio to submit.');
    }
  };

  return (
    <div>
      <h2 className='centerbox-title'>Record Your Voice</h2>
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

      {audioUrl ? (
        <div className='audio-container'>
          <audio className="audio" controls src={audioUrl}></audio>
        </div>
      ) : (
        <div className='audio-container'>
        <audio className="audio" controls ></audio>
        </div>
      )}

      {isRecording ? (
        <button id="btnToggle" onClick={toggleRecording}>Stop Recording</button>
      ) : (
        <>
          <button id="btnToggle" onClick={toggleRecording}>Start Recording</button>
          {audio && (
            <button id="btnSubmit" onClick={uploadAudioToServer}>Submit</button>
          )}
        </>
      )}

      <button id="btnReset" onClick={resetRecording}>Reset</button>

      {/* Display the response box when the server responds */}
      {serverResponse && <ResponseBox serverResponse={serverResponse} />}
    </div>
  );
}

export default RecordContent;
