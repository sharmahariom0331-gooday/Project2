import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Truck, Clock, CheckCircle } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { Order, OrderStatus } from '../types';
import { formatDate, formatCurrency, getOrderStatusLabel, generateMockOrders } from '../utils/helpers';

const OrdersSection: React.FC = () => {
  const { orders, setOrders } = useDashboardStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    if (orders.length === 0) {
      setOrders(generateMockOrders());
    }
  }, []);

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="orders-container">
      {/* Filter Bar */}
      <motion.div
        className="orders-filter"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title">My Orders</h1>
        <div className="filter-buttons">
          {(['all', 'pending', 'confirmed', 'shipped', 'delivered'] as const).map(
            (status) => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>
      </motion.div>

      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              className="order-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="order-card-header">
                <div className="order-header-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`status-badge status-${order.status}`}>
                  {getStatusIcon(order.status)}
                  {getOrderStatusLabel(order.status as OrderStatus)}
                </span>
              </div>

              <div className="order-items-preview">
                <div className="items-grid">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="item-preview">
                      <img src={item.productImage} alt={item.productName} />
                      <p className="item-name">{item.productName}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="more-items">
                      <p>+{order.items.length - 2} more</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                {order.discount && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="total-amount">{formatCurrency(order.total)}</span>
                </div>
              </div>

              <button
                className="expand-btn"
                onClick={() =>
                  setSelectedOrder(selectedOrder?.id === order.id ? null : order)
                }
              >
                <span>{selectedOrder?.id === order.id ? 'Hide' : 'View'} Details</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform:
                      selectedOrder?.id === order.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s',
                  }}
                />
              </button>

              {/* Expanded Details */}
              {selectedOrder?.id === order.id && (
                <motion.div
                  className="order-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="details-section">
                    <h4>Items</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="detail-item">
                        <div className="item-detail-info">
                          <p className="item-detail-name">{item.productName}</p>
                          <p className="item-detail-qty">Quantity: {item.quantity}</p>
                        </div>
                        <p className="item-detail-price">{formatCurrency(item.total)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="details-section">
                    <h4>Shipping Address</h4>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.pincode}
                    </p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>

                  <div className="details-section">
                    <h4>Timeline</h4>
                    <div className="timeline">
                      {order.timeline.map((event, idx) => (
                        <div key={event.id} className="timeline-item">
                          <div className="timeline-dot completed"></div>
                          <div className="timeline-content">
                            <p className="timeline-title">{event.description}</p>
                            <p className="timeline-time">{formatDate(event.timestamp)}</p>
                            {event.location && (
                              <p className="timeline-location">{event.location}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="btn-primary">
                      <Download size={18} /> Download Invoice
                    </button>
                    {order.status === 'delivered' && (
                      <button className="btn-secondary">Return Item</button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Truck size={48} />
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
