import React, { useRef } from 'react';

interface FileLoadProps {
  onXmlLoaded: (xml: string) => void;
}

const FileLoad: React.FC<FileLoadProps> = ({ onXmlLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const xml = e.target?.result as string;
      onXmlLoaded(xml);
      
      // Reset input so the same file can be uploaded twice if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <button 
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Open BPMN File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".bpmn, .xml"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileLoad;