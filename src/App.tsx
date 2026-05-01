import  { useRef, useEffect, useState } from "react";
import "./App.css";
//this is my default file
import defaultXml from "./resources/default.bpmn?raw";
import BpmnModeller, { BpmnModellerHandle } from "./services/BpmnModeller";
import { LoadButton } from "./components/LoadButton";
import { SaveButton } from "./components/SaveButton";
import logo from "./resources/logo.svg";
import downImage from "./resources/down.svg"
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-js.css";

function App() {

  const modellerRef = useRef<BpmnModellerHandle>(null);
    const hasImportedRef = useRef(false);
  const [fileName, setFileName] = useState<string>("my-process.bpmn");


  useEffect(function () {
    if (modellerRef.current && defaultXml && !!hasImportedRef) {
      hasImportedRef.current = true;
      modellerRef.current.importXml(defaultXml);
    }
  }, []);

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

  async function handleExportSVG() {
    const savedFileName = await modellerRef.current?.exportSVG(fileName);
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
          <SaveButton label = "BPMN" SvgImage = {downImage} onExport={handleExportBPMN} />
          <SaveButton label = "SVG" SvgImage = {downImage} onExport={handleExportSVG} />
        </div>
      </header>
      <main className="app-main">
        <BpmnModeller ref={modellerRef} />
      </main>
    </div>
  );
}

export default App;
