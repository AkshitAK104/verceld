import React from 'react';
import LeadForm from './LeadForm';
import LeadList from './LeadList';

function App() {
  return (
    <div className="App" style={{ padding: '1rem' }}>
      <h1>TrackFlow CRM</h1>
      <LeadForm />
      <LeadList />
    </div>
  );
}

export default App;