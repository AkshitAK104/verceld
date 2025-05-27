import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function LeadForm() {
  const [lead, setLead] = useState({ name: '', contact: '', stage: 'New' });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('leads').insert([lead]);
    setLead({ name: '', contact: '', stage: 'New' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={lead.name} onChange={handleChange} />
      <input name="contact" placeholder="Contact" value={lead.contact} onChange={handleChange} />
      <select name="stage" value={lead.stage} onChange={handleChange}>
        {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button type="submit">Add Lead</button>
    </form>
  );
}

export default LeadForm;
