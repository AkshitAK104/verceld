import React, { useState } from 'react';
import { supabase } from './supabaseClient';

 function  LeadForm({ onAdd }) {
  const [lead, setLead] = useState({ name: '', contact: '', company: '', product_interest: '', stage: 'New', follow_up_date: '' });

  const handleChange = (e) => setLead({ ...lead, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('leads').insert([lead]);
    setLead({ name: '', contact: '', company: '', product_interest: '', stage: 'New', follow_up_date: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '10px' }}>➕ Add Lead</h3>
      {['name', 'contact', 'company', 'product_interest'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.replace('_', ' ')}
          value={lead[field]}
          onChange={handleChange}
          style={{ marginBottom: '8px', padding: '8px', width: '100%' }}
        />
      ))}
      <select name="stage" value={lead.stage} onChange={handleChange} style={{ marginBottom: '8px', padding: '8px', width: '100%' }}>
        {['New','Contacted','Qualified','Proposal Sent','Won','Lost'].map(stage => <option key={stage}>{stage}</option>)}
      </select>
      <input type="date" name="follow_up_date" value={lead.follow_up_date} onChange={handleChange} style={{ marginBottom: '8px', padding: '8px', width: '100%' }} />
      <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Add</button>
    </form>
  );
}
export default LeadForm;
