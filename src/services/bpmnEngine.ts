// src/services/bpmnEngine.ts
import BpmnModeler from 'bpmn-js/lib/Modeler';

export class BpmnEngine {
  private modeler: BpmnModeler;

  constructor(container: HTMLElement) {
    this.modeler = new BpmnModeler({
      container,
      keyboard: { bindTo: window }
    });
  }

  async import(xml: string):Promise <{ warnings: string[]}>  {
    return await this.modeler.importXML(xml);
  }

  async export(): Promise<string> {
    const { xml } = await this.modeler.saveXML({ format: true });
    return xml || '';
  }

  destroy() {
    this.modeler.destroy();
  }

  create() {
    this.modeler.createDiagram();
  }
}