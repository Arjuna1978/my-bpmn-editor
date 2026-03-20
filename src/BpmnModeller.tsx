// src/BpmnModeller.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { LoadButton } from './components/LoadButton'; // New separate View
import { SaveButton } from './components/SaveButton';
import { BpmnEngine } from './services/bpmnEngine';
import { exportToBpmn } from './services/exportToBpmn';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

const BpmnModeller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<BpmnEngine | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || engineRef.current) return;

    engineRef.current = new BpmnEngine(containerRef.current);
    engineRef.current.create();

    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  // Bridge logic: View sends XML -> Controller calls Process
  const handleLoadXml = async (xml: string) => {
    try {
      if (engineRef.current) {
        await engineRef.current.import(xml);
      }
    } catch (err) {
      console.error('Import failed', err);
      alert('Failed to load BPMN file.');
    }
  };

  return (
    <div className="bpmn-container">
      <div style={{ padding: '10px', background: '#eee', borderBottom: '1px solid #ccc' }}>
        <LoadButton onXmlLoaded={handleLoadXml} />
        <SaveButton onExport={() => {exportToBpmn}} />
      </div>
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '85vh', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default BpmnModeller;