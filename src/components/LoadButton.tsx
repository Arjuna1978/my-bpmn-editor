import React, { useRef } from 'react';
import "../App.css";

interface LoadButtonProps {
  onXmlLoaded: (xml: string) => void;
}



export function LoadButton({ onXmlLoaded }: LoadButtonProps): React.JSX.Element {
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
      <button className="button-7" role ="button"
        onClick={() => fileInputRef.current?.click()}
      >
        Open
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".bpmn, .xml"
        onChange={handleFileChange} />
    </>
  );
}