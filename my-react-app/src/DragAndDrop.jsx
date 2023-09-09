import React, { useState, useRef } from 'react';

const DragAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0]; // Only handle the first dropped file
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    // Programmatically trigger the file input when the user clicks the submit button
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Handle the file upload here (e.g., send it to a server)
      console.log('Selected file:', file);
      // Implement your file upload logic here
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    // Reset the file input value to clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div
        className={`drag-and-drop ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUpload}
      >
        {selectedFile ? (
          <div>
            <p>Selected file:</p>
            <p>{selectedFile.name}</p>
          </div>
        ) : (
          <p>{dragging ? 'Drop the file here' : 'Click or drag and drop a file here'}</p>
        )}
      </div>
      <input
        type="file"
        accept="audio/*" // Specify the accepted file types if needed
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />

      {/* Buttons outside the drag and drop box */}
      <div>
        <button className="submit-button" onClick={handleUpload}>Submit</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default DragAndDrop;
