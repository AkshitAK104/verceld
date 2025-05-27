import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function OrderList({ refresh }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('orders').select('*');
      setOrders(data || []);
    };
    fetchOrders();
  }, [refresh]);

  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '10px' }}>📦 Orders</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((o) => (
          <li key={o.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #eee' }}>
            Lead: {o.lead_id} - {o.status} - {o.tracking_number || 'No tracking'}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default OrderList;