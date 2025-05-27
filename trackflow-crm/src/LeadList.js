import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function LeadList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase.from('leads').select('*');
      if (!error) setLeads(data);
    };
    fetchLeads();
  }, []);

  return (
    <ul>
      {leads.map((lead) => (
        <li key={lead.id}>{lead.name} - {lead.stage}</li>
      ))}
    </ul>
  );
}

export default LeadList;