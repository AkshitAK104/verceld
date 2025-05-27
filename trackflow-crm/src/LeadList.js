import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function LeadList({ refresh }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase.from('leads').select('*');
      if (!error) setLeads(data);
    };
    fetchLeads();
  }, [refresh]);

  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '10px' }}>📋 Leads</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {leads.map((lead) => (
          <li key={lead.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{lead.name}</strong> - {lead.stage} - Follow up: {lead.follow_up_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadList;