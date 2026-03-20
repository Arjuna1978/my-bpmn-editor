import React, { useRef } from 'react';

interface LoadButtonProps {
  onXmlLoaded: (xml: string) => void;
}

export const LoadButton: React.FC<LoadButtonProps> = ({ onXmlLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const xml = e.target?.result as string;
      onXmlLoaded(xml); // Pass the raw data up
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <>
      <button 
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Open BPMN
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".bpmn, .xml"
        onChange={handleFileChange}
      />
    </>
  );
};