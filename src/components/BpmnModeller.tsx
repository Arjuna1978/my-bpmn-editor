import React, { useLayoutEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { BpmnEngine } from '../services/bpmnEngine';
import exportToBpmn from '../services/exportToBpmn';

export interface BpmnModellerHandle {
  importXml: (xml: string) => Promise<void>;
  exportXml: (fileName: string) => Promise<void>;
}

const BpmnModeller = forwardRef<BpmnModellerHandle>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<BpmnEngine | null>(null);

  // Expose methods to the parent (App.tsx)
  useImperativeHandle(ref, () => ({
    async importXml(xml: string) {
      if (engineRef.current) await engineRef.current.import(xml);
    },
    async exportXml(fileName: string) {
      if (engineRef.current) {
        const xml = await engineRef.current.export();
        exportToBpmn({xml, fileName});
      }
    }
  }));

  useLayoutEffect(() => {
    if (!containerRef.current || engineRef.current) return;
    
    engineRef.current = new BpmnEngine(containerRef.current);
    engineRef.current.create();

    // Load your default diagram immediately after creation
    const defaultBpmn = `YOUR_XML_STRING_HERE`;
    engineRef.current.import(defaultBpmn);

    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="bpmn-canvas" />;
});

export default BpmnModeller;