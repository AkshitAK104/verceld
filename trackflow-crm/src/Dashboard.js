import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, won: 0, followups: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: leads } = await supabase.from('leads').select('*');
      const { data: orders } = await supabase.from('orders').select('*');
      const today = new Date().toISOString().split('T')[0];
      setStats({
        leads: leads.length,
        won: leads.filter(l => l.stage === 'Won').length,
        followups: leads.filter(l => l.follow_up_date <= today).length,
        orders: orders.length,
      });
    };
    fetchStats();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
      {['Total Leads', 'Won Leads', 'Follow-ups', 'Orders'].map((label, i) => (
        <div key={label} style={{ flex: 1, padding: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <strong>{label}:</strong> {Object.values(stats)[i]}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
