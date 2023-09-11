import React from 'react';

const DragAndDrop = ({
  selectedFile,
  fileInputRef,
  handleFileInputChange,
  handleUpload,
  handleReset,
}) => {
  return (
    <div>
      <div
        className={`drag-and-drop ${selectedFile ? 'file-selected' : ''}`}
        onClick={handleUpload}
      >
        {selectedFile ? (
          <div>
            <p>Selected file:</p>
            <p>{selectedFile.name}</p>
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

      {/* Buttons outside the drag and drop box */}
      <div>
        <button className="betabutton" onClick={handleUpload}>Submit</button>
        <button className="betabutton" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default DragAndDrop;
