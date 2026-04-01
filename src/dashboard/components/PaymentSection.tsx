import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { formatDate, formatCurrency } from '../utils/helpers';

const PaymentSection: React.FC = () => {
  const {
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
  } = useDashboardStore();
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const mockPaymentHistory = [
    {
      id: '1',
      amount: 748725,
      method: 'Credit Card ****1234',
      status: 'completed',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: 'ORD-001',
    },
    {
      id: '2',
      amount: 1586365,
      method: 'Debit Card ****5678',
      status: 'completed',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: 'ORD-002',
    },
  ];

  return (
    <div className="payment-container">
      {/* Payment Methods */}
      <motion.section
        className="payment-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-header">
          <h2>Payment Methods</h2>
          <button
            className="edit-btn"
            onClick={() => setIsAddingPayment(!isAddingPayment)}
          >
            <Plus size={18} /> Add Payment Method
          </button>
        </div>

        {isAddingPayment && (
          <div className="payment-form">
            <div className="form-row">
              <div className="form-group">
                <label>Card Holder Name</label>
                <input type="text" className="form-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="form-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="form-input" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="XXX" className="form-input" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary">Add Card</button>
              <button
                className="btn-secondary"
                onClick={() => setIsAddingPayment(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {paymentMethods.length > 0 ? (
          <div className="payment-methods-list">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                className={`payment-method-card ${method.isDefault ? 'default' : ''}`}
                layout
              >
                <div className="method-icon">
                  <CreditCard size={32} />
                </div>
                <div className="method-info">
                  <h4>{method.name}</h4>
                  {method.last4 && <p>•••• {method.last4}</p>}
                  {method.expiryDate && <p>Expires: {method.expiryDate}</p>}
                </div>
                {method.isDefault && (
                  <span className="default-badge">
                    <Check size={14} /> Default
                  </span>
                )}
                <button
                  className="icon-btn delete"
                  onClick={() => removePaymentMethod(method.id)}
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No payment methods saved</p>
        )}
      </motion.section>

      {/* Payment History */}
      <motion.section
        className="payment-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>Payment History</h2>
        <div className="payment-history">
          {mockPaymentHistory.map((payment, index) => (
            <motion.div
              key={payment.id}
              className="history-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="history-info">
                <div className="history-method">
                  <CreditCard size={20} />
                  <div>
                    <p className="method-name">{payment.method}</p>
                    <p className="order-id">Order {payment.orderId}</p>
                  </div>
                </div>
              </div>
              <div className="history-amount">
                <p className="amount">{formatCurrency(payment.amount)}</p>
                <p className="date">{formatDate(payment.date)}</p>
              </div>
              <span className={`status-badge ${payment.status}`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default PaymentSection;
