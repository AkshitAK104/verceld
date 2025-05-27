import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function OrderForm({ onAdd, refreshLeads }) {
  const [order, setOrder] = useState({ lead_id: '', status: 'Order Received', courier: '', tracking_number: '', dispatch_date: '' });
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from('leads').select('*').eq('stage', 'Won');
      setLeads(data || []);
    };
    fetchLeads();
  }, [refreshLeads]);

  const handleChange = (e) => setOrder({ ...order, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('orders').insert([order]);
    setOrder({ lead_id: '', status: 'Order Received', courier: '', tracking_number: '', dispatch_date: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '10px' }}>🚚 New Order</h3>
      <select name="lead_id" value={order.lead_id} onChange={handleChange} style={{ marginBottom: '8px', padding: '8px', width: '100%' }}>
        <option value="">Select Won Lead</option>
        {leads.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
      </select>
      {['status', 'courier', 'tracking_number'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.replace('_', ' ')}
          value={order[field]}
          onChange={handleChange}
          style={{ marginBottom: '8px', padding: '8px', width: '100%' }}
        />
      ))}
      <input type="date" name="dispatch_date" value={order.dispatch_date} onChange={handleChange} style={{ marginBottom: '8px', padding: '8px', width: '100%' }} />
      <button type="submit" style={{ padding: '10px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Create</button>
    </form>
  );
}
export default OrderForm;