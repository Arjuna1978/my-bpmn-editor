//This is what I use to tell TS custom types
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

//
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

declare module 'bpmn-js/lib/Viewer' {
  export default class Viewer {
    constructor(options?: any);
    importXML(xml: string): Promise<{ warnings: Array<any> }>;
    saveXML(options?: { format: boolean }): Promise<{ xml: string }>;
    saveSVG(options?: any): Promise<{ svg: string }>;
    destroy(): void;
    get(moduleName: string): any;
    on(event: string, callback: Function): void;
    detach(): void;
  }
}

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.bpmn' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
