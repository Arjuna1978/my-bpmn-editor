import { useLayoutEffect, useRef, useImperativeHandle } from 'react';
import type { Ref } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { exportToSvg } from './exportToSVG';

// --- Inlined exportToBpmn ---
interface SaveFileOptions {
  xml: string;
  fileName: string;
}

async function exportToBpmn(options: SaveFileOptions): Promise<void> {
  const blob = new Blob([options.xml], { type: 'application/bpmn20-xml;charset=UTF-8' });

  // "Save As" dialog
  if ('showSaveFilePicker' in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: options.fileName,
        types: [
          {
            description: 'BPMN 2.0 XML Diagram',
            accept: {
              'application/bpmn20-xml': ['.bpmn', '.xml'],
            },
          },
        ],
      });

      // Write file
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      
      // Successfully saved via native picker, so we exit
      return;
    } catch (err: any) {
      //Handle abort
      if (err.name === 'AbortError') {
        return;
      }
      console.warn('No native file picker.', err);
    }
  }
}

// --- Inlined bpmnEngine ---
class BpmnEngine {
  private modeler: any;

  constructor(container: HTMLElement) {
    this.modeler = new BpmnModeler({
      container
      // Removed `keyboard: { bindTo: window }` because it is no longer supported in newer bpmn-js versions
    });
  }

  async import(xml: string): Promise<{ warnings: string[] }>  {
    return await this.modeler.importXML(xml);
  }

  async exportXML(): Promise<string> {
    const { xml } = await this.modeler.saveXML({ format: true });
    return xml || '';
  }

  
  async exportSvg(): Promise<string> {
    const { svg } = await this.modeler.saveSVG();
    return svg || '';
  }

  destroy() {
    this.modeler.destroy();
  }

  create() {
    this.modeler.createDiagram();
  }
}

// --- Component ---
export interface BpmnModellerHandle {
  importXml: (xml: string) => Promise<void>;
  exportXml: (fileName: string) => Promise<void>;
  exportSVG: (fileName: string) => Promise<void>;

}

export default function BpmnModeller({ ref }: { ref?: Ref<BpmnModellerHandle> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<BpmnEngine | null>(null);

  useImperativeHandle(ref, function createHandle() {
    return {
      async importXml(xml: string) {
        if (engineRef.current) await engineRef.current.import(xml);
      },

      async exportXml(fileName: string) {
        if (engineRef.current) {
          const xml = await engineRef.current.exportXML();
          exportToBpmn({ xml, fileName });
        }
      },
      async exportSVG(fileName: string) {
        if (engineRef.current) {
          const xml = await engineRef.current.exportSvg();
          exportToSvg( xml, fileName );
        }
      }
    };
  });

  useLayoutEffect(function setupEngine() {
    if (!containerRef.current || engineRef.current) return;
    
    engineRef.current = new BpmnEngine(containerRef.current);
    engineRef.current.create();

    return function cleanupEngine() {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="bpmn-canvas" />;
}