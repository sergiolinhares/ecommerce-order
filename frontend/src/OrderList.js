import React, { useState, useEffect } from 'react';
import { mockOrders } from './mockData';

// Format date to a more readable format
const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderList = () => {
  // State for orders data and loading state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ placedOrders: [] });

  // Simulate API call with useEffect
  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setData({ placedOrders: mockOrders });
      setLoading(false);
    }, 1000); // 1 second delay to simulate loading

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <div>
      <h2>Orders</h2>
      {data.placedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        data.placedOrders.map((order) => (
          <div key={order.order} className="order-card">
            <div className="order-header">
              <h3>Order: {order.order}</h3>
              <div>
                <p>Date: {formatDate(order.createdAt)}</p>
                <p>Origin: {order.origin}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="order-items">
              <h4>Items:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                  <div className="item-details">
                    <p><strong>{item.name}</strong></p>
                    <p>Quantity: {item.qty}</p>
                    <p>Price: {item.currency} {item.cost.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
