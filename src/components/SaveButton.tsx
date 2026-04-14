
import React from 'react';
import "../App.css";



interface ExportButtonProps {
  onExport: () => void;
}

export function SaveButton({ onExport }: ExportButtonProps): React.JSX.Element {
  return (
    <button className="button"
      onClick={onExport}>
      Save
    </button>
  );
}