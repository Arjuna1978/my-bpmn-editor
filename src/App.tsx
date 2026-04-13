import React from 'react';
import './App.css';
import BpmnModeller from './BpmnModeller';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className='app-title'>Arjuna's BPMN Workflow Editor</h1>
      </header>
      <main>
        <BpmnModeller />
      </main>
    </div>
  );
}

export default App;