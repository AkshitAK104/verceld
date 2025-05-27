import React, { useState } from 'react';
import LeadForm from './LeadForm';
import LeadList from './LeadList';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import Dashboard from './Dashboard';

function App() {
  const [refreshLeads, setRefreshLeads] = useState(0);
  const [refreshOrders, setRefreshOrders] = useState(0);

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>📊 TrackFlow CRM</h1>
      <Dashboard />
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <LeadForm onAdd={() => setRefreshLeads((r) => r + 1)} />
          <LeadList refresh={refreshLeads} />
        </div>
        <div style={{ flex: 1 }}>
          <OrderForm refreshLeads={refreshLeads} onAdd={() => setRefreshOrders((r) => r + 1)} />
          <OrderList refresh={refreshOrders} />
        </div>
      </div>
    </div>
  );
}

export default App;
