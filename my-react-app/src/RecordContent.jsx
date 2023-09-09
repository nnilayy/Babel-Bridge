import React, { useState } from 'react';

function RecordContent() {
  const [audioStream, setAudioStream] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('Option 1');
  const [selectedOption2, setSelectedOption2] = useState('Option A');

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
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
          let audioData = new Blob(dataArray, { type: 'audio/mp3;' });
          dataArray = [];
          let audioSrc = window.URL.createObjectURL(audioData);
          setAudioUrl(audioSrc);
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

      {audioUrl ? (<div><audio className="audio" controls src={audioUrl} ></audio> </div>) : (<audio controls style={{ display: 'none' }}></audio>)}
      
      <button id="btnToggle" onClick={toggleRecording}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      <button id="btnReset" onClick={resetRecording}>Reset</button>
    </div>
  );
}

export default RecordContent;
