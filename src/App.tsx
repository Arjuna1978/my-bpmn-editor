import  { useRef, useEffect } from "react";
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

  // Automatically load the default diagram once the modeller is ready
  useEffect(function () {
    if (modellerRef.current && defaultXml) {
      modellerRef.current.importXml(defaultXml);
    }
  }, []);

  function handleLoadXml(xml: string) {
    return modellerRef.current?.importXml(xml);
  }
  function handleExport() {
    return modellerRef.current?.exportXml();
  }

  return (
    <div className="app">
      <header className="floating-header">
        <img src={logo} alt="Logo" width="50px" />
        <h1 className="app-title">Arjuna's BPMN Workflow Editor</h1>
        <div className="app-toolbar">
          <LoadButton onXmlLoaded={handleLoadXml} />
          <SaveButton onExport={handleExport} />
        </div>
      </header>
      <main className="app-main">
        <BpmnModeller ref={modellerRef} />
      </main>
    </div>
  );
}

export default App;
