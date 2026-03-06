import React, { useLayoutEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import FileLoad from './fileload'

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

const BpmnModeller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || modelerRef.current) return;

    modelerRef.current = new BpmnModeler({
      container: containerRef.current,
      keyboard: { bindTo: window }
    });

    modelerRef.current.createDiagram();

    return () => {
      modelerRef.current?.destroy();
      modelerRef.current = null;
    };
  }, []);

  const handleImport = async (xml: string) => {
    try {
      if (modelerRef.current) {
        await modelerRef.current.importXML(xml);
      }
    } catch (err) {
      console.error('Failed to parse BPMN XML', err);
      alert('Invalid BPMN file.');
    }
  };

  return (
    <div>
      <div style={{ padding: '10px', background: '#eee', borderBottom: '1px solid #ccc' }}>
        <FileLoad onXmlLoaded={handleImport} />
      </div>
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '85vh', border: '1px solid #ccc' }} 
      />
    </div>
  );
};

export default BpmnModeller;