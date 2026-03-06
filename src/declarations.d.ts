// This tells TypeScript that CSS files are valid modules
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// This handles the BPMN modeller itself which lacks built-in types
declare module 'bpmn-js/lib/Modeler' {
  export default class Modeler {
    constructor(options?: any);
    importXML(xml: string): Promise<{ warnings: any[] }>;
    saveXML(options?: any): Promise<{ xml: string }>;
    createDiagram(): Promise<{ warnings: any[] }>;
    destroy(): void;
    on(event: string, callback: (e: any) => void): void;
  }
}