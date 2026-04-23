import  { useRef, useEffect, useState } from "react";
import "./App.css";
import defaultXml from "./resources/default.bpmn?raw";
import BpmnModeller, { BpmnModellerHandle } from "./components/BpmnModeller";
import { LoadButton } from "./components/LoadButton";
import { SaveButton } from "./components/SaveButton";
import logo from "./resources/logo.svg";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-js.css";

function App() {

  const modellerRef = useRef<BpmnModellerHandle>(null);
  const [fileName, setFileName] = useState<string>("my-process.bpmn");


  useEffect(function () {
    if (modellerRef.current && defaultXml) {
      modellerRef.current.importXml(defaultXml);
    }
  }, []);

  // callback for file loading service
  function handleLoadXml({ xml, fileName }: { xml: string; fileName: string }) {
    setFileName(fileName);
    return modellerRef.current?.importXml(xml);
  }
  
  async function handleExportBPMN() {
    const savedFileName = await modellerRef.current?.exportXml(fileName);
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }

  return (
    <div className="app">
      <header className="floating-header">
        <img src={logo} alt="Logo" width="50px" />
        <h1 className="app-title">VizFlo</h1>
        <div className="app-toolbar">
          <LoadButton onXmlLoaded={handleLoadXml} />
          <SaveButton onExport={handleExportBPMN} />
        </div>
      </header>
      <main className="app-main">
        <BpmnModeller ref={modellerRef} />
      </main>
    </div>
  );
}

export default App;
