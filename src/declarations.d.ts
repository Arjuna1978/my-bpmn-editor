//This is what I use to tell TS custom types
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}


declare module 'bpmn-js/lib/Modeler' {
  import Viewer from 'bpmn-js/lib/Viewer';
  export default class Modeler extends Viewer {
    constructor(options?: unknown);
    createDiagram(): Promise<{ warnings: unknown[] }>;
  }
}

declare module 'bpmn-js/lib/Viewer' {
  export default class Viewer {
    constructor(options?: unknown);
    importXML(xml: string): Promise<{ warnings: unknown[] }>;
    saveXML(options?: { format: boolean }): Promise<{ xml: string }>;
    saveSVG(options?: unknown): Promise<{ svg: string }>;
    destroy(): void;
    get(moduleName: string): unknown;
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
