
import React from 'react';

interface ExportButtonProps {
  onExport: () => void;
}

export const SaveButton: React.FC<ExportButtonProps> = ({ onExport }) => (
  <button 
    onClick={onExport}
    style={{ padding: '8px 16px', cursor: 'pointer', marginLeft: '10px' }}
  >
    Save BPMN
  </button>
);