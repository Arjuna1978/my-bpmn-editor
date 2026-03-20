import React from 'react';
import './App.css';
import BpmnModeller from './BpmnModeller';

function App() {
  return (
    <div className="App">
      <header style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Arjuna's BPMN Workflow Editor</h1>
      </header>
      <main>
        <BpmnModeller />
      </main>
    </div>
  );
}

export default App;